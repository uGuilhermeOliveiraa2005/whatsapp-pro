// src/store/chat-store.ts (versão com imutabilidade corrigida)
"use client";

import { create } from 'zustand';
import { Conversation, Message } from '@/types';

interface ChatState {
  conversations: Record<string, Conversation>;
  activeContactId: string | null;
  actions: {
    setActiveContactId: (contactId: string | null) => void;
    addMessage: (contactId: string, message: Message) => void;
    loadInitialConversations: (conversations: Conversation[]) => void;
  };
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: {},
  activeContactId: null,

  actions: {
    setActiveContactId: (contactId) => set({ activeContactId: contactId }),

    addMessage: (contactId, message) =>
      set((state) => {
        // Cria uma cópia superficial do objeto de conversas.
        const newConversations = { ...state.conversations };
        const conversation = newConversations[contactId];

        if (conversation) {
          // --- A CORREÇÃO ESTÁ AQUI ---
          // Em vez de modificar o array antigo, criamos um novo
          // com todas as mensagens antigas (...conversation.messages) e a nova.
          const updatedConversation = {
            ...conversation,
            messages: [...conversation.messages, message],
            lastMessageAt: new Date(),
          };
          newConversations[contactId] = updatedConversation;
          // --- FIM DA CORREÇÃO ---
        } else {
          // A lógica para criar uma nova conversa já é imutável e está correta.
          newConversations[contactId] = {
            contactId: contactId,
            contactName: contactId,
            contactAvatar: `https://ui-avatars.com/api/?name=${contactId.slice(-2)}`,
            messages: [message],
            lastMessageAt: new Date(),
          };
        }
        
        // Retorna o novo objeto de conversas para o Zustand.
        return { conversations: newConversations };
      }),

    loadInitialConversations: (initialConversations) => {
        const conversationsRecord: Record<string, Conversation> = {};
        for (const conv of initialConversations) {
            conversationsRecord[conv.contactId] = conv;
        }
        set({ conversations: conversationsRecord });
    }
  },
}));

export const useChatActions = () => useChatStore((state) => state.actions);