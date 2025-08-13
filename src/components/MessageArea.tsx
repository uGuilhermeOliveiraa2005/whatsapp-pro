// src/components/MessageArea.tsx (versão corrigida)
"use client";

import { useChatStore } from "@/store/chat-store";
import { MessageBubble } from "./MessageBubble";

export function MessageArea() {
  // --- MUDANÇA AQUI ---
  // Primeiro, pegamos a conversa ativa de forma estável.
  // O seletor só vai rodar de novo se o ID ativo ou a conversa em si mudar.
  const activeConversation = useChatStore((state) => 
    state.activeContactId ? state.conversations[state.activeContactId] : null
  );

  // Agora, derivamos as mensagens a partir da conversa, fora do hook.
  const messages = activeConversation ? activeConversation.messages : [];
  // --- FIM DA MUDANÇA ---

  if (!activeConversation) {
    return (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-400 bg-zinc-900 bg-[url('/bg-chat-pattern.svg')]">
            <div className="p-6 bg-zinc-800 rounded-2xl">
                <h2 className="text-2xl font-semibold text-white">Bem-vindo ao seu Chat</h2>
                <p className="mt-2">Selecione uma conversa na lista à esquerda para começar a conversar.</p>
            </div>
        </div>
    )
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-zinc-900 bg-[url('/bg-chat-pattern.svg')]">
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} sentBy={msg.sentBy} text={msg.text} time={msg.time} />
        ))}
      </div>
    </div>
  );
}