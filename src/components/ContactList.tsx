// src/components/ContactList.tsx
"use client";

import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore, useChatActions } from "@/store/chat-store";
import { cn } from "@/lib/utils";

export function ContactList() {
  const conversations = useChatStore((state) => state.conversations);
  const activeContactId = useChatStore((state) => state.activeContactId);
  const { setActiveContactId } = useChatActions();

  // Transforma o objeto de conversas em um array e ordena pela mensagem mais recente
  const sortedConversations = useMemo(() => 
    Object.values(conversations).sort((a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()),
    [conversations]
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-zinc-700">
        <h2 className="text-xl font-bold">Conversas</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.map((conv) => (
          <div 
            key={conv.contactId} 
            className={cn(
              "flex items-center p-4 cursor-pointer border-b border-zinc-800",
              {
                "bg-zinc-700 hover:bg-zinc-700": activeContactId === conv.contactId,
                "hover:bg-zinc-800": activeContactId !== conv.contactId,
              }
            )}
            onClick={() => setActiveContactId(conv.contactId)}
          >
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={conv.contactAvatar} alt={conv.contactName} />
              <AvatarFallback>{conv.contactName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <h3 className="font-semibold">{conv.contactName}</h3>
                <p className="text-sm text-zinc-400 truncate">
                  {conv.messages[conv.messages.length - 1]?.text || "Nenhuma mensagem"}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}