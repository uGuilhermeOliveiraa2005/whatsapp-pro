// src/components/ChatHeader.tsx (versão corrigida)
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/store/chat-store";
import { Search, MoreVertical } from "lucide-react";

export function ChatHeader() {
  // Aplicando a mesma correção aqui para garantir estabilidade
  const activeConversation = useChatStore((state) => 
    state.activeContactId ? state.conversations[state.activeContactId] : null
  );

  if (!activeConversation) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-4">
          <AvatarImage src={activeConversation.contactAvatar} alt={activeConversation.contactName} />
          <AvatarFallback>{activeConversation.contactName.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{activeConversation.contactName}</h3>
        </div>
      </div>
      <div className="flex items-center gap-6 text-zinc-400">
        <Search className="h-6 w-6 cursor-pointer hover:text-white" />
        <MoreVertical className="h-6 w-6 cursor-pointer hover:text-white" />
      </div>
    </div>
  );
}