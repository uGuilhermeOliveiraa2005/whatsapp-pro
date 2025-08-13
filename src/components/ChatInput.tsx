// src/components/ChatInput.tsx (versão funcional)
"use client";

import { Smile, Paperclip, Send, Mic } from "lucide-react";
import { useState } from "react";
import { useChatStore, useChatActions } from "@/store/chat-store";
import { Message } from "@/types";

export function ChatInput() {
  const [messageText, setMessageText] = useState("");
  const activeContactId = useChatStore((state) => state.activeContactId);
  const { addMessage } = useChatActions();

  const handleSendMessage = () => {
    // Não faz nada se não houver um contato ativo ou se a mensagem estiver vazia
    if (!activeContactId || !messageText.trim()) {
      return;
    }

    // 1. Formata a hora atual para HH:MM
    const currentTime = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // 2. Cria o objeto da nova mensagem, seguindo nossa tipagem
    const newMessage: Message = {
      id: new Date().toISOString(), // ID único provisório
      text: messageText.trim(),
      time: currentTime,
      sentBy: 'me', // A mensagem é enviada por "mim" (o usuário da interface)
    };

    // 3. Chama a ação do nosso store para adicionar a mensagem à conversa correta
    addMessage(activeContactId, newMessage);

    // 4. Limpa o campo de texto
    setMessageText("");
  };

  return (
    <div className="flex items-center p-3 bg-zinc-800 border-t border-zinc-700">
      <div className="flex items-center gap-3 text-zinc-400">
        <Smile className="h-6 w-6 cursor-pointer hover:text-white" />
        <Paperclip className="h-6 w-6 cursor-pointer hover:text-white -rotate-45" />
      </div>

      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder={activeContactId ? "Digite uma mensagem" : "Selecione uma conversa para começar"}
          className="w-full p-2 rounded-lg bg-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          // Desabilita o input se nenhuma conversa estiver selecionada
          disabled={!activeContactId} 
        />
      </div>
      
      <div>
        {messageText.trim() ? (
          <button
            onClick={handleSendMessage}
            className="p-3 rounded-full bg-green-600 text-white hover:bg-green-700 flex items-center justify-center disabled:bg-zinc-600"
            disabled={!activeContactId}
          >
            <Send className="h-5 w-5" />
          </button>
        ) : (
          <button 
            className="p-3 rounded-full text-zinc-400 hover:text-white flex items-center justify-center disabled:opacity-50"
            disabled={!activeContactId}
          >
            <Mic className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}