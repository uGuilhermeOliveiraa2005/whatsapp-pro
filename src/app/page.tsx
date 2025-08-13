// src/app/page.tsx (versão com carregamento de dados)
"use client";

import { useEffect } from "react"; // <-- Importar o useEffect
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInput } from "@/components/ChatInput";
import { MessageArea } from "@/components/MessageArea";
import { useChatActions } from "@/store/chat-store"; // <-- Importar as ações
import { mockConversations } from "@/store/mock-data"; // <-- Importar nossos dados

export default function ChatPage() {
  // Pega a ação para carregar as conversas do nosso store
  const { loadInitialConversations } = useChatActions();

  // useEffect para carregar os dados iniciais APENAS UMA VEZ
  useEffect(() => {
    loadInitialConversations(mockConversations);
  }, [loadInitialConversations]); // O array de dependências garante que isso só rode uma vez

  return (
    <>
      <ChatHeader />
      <MessageArea />
      <ChatInput />
    </>
  );
}