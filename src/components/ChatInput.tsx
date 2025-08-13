// src/components/ChatInput.tsx (versão final com envio real)
"use client";

import { Smile, Paperclip, Send, Mic } from "lucide-react";
import { useState } from "react";
import { useChatStore, useChatActions } from "@/store/chat-store";
import { Message } from "@/types";
import axios from 'axios'; // Usaremos axios para a chamada de API

export function ChatInput() {
  const [messageText, setMessageText] = useState("");
  const activeContactId = useChatStore((state) => state.activeContactId);
  const { addMessage } = useChatActions();

  const handleSendMessage = async () => { // A função agora é async
    if (!activeContactId || !messageText.trim()) return;

    const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newMessage: Message = {
      id: new Date().toISOString(),
      text: messageText.trim(),
      time: currentTime,
      sentBy: 'me',
    };

    // --- ATUALIZAÇÃO OTIMISTA ---
    // Adicionamos a mensagem na UI instantaneamente, sem esperar a resposta do servidor.
    addMessage(activeContactId, newMessage);
    const textToSend = messageText.trim();
    setMessageText(""); // Limpa o campo de texto

    // --- CHAMADA DE API ---
    try {
      console.log(`Enviando mensagem para a API: Para ${activeContactId}, Texto: ${textToSend}`);
      await axios.post('/api/send', {
        to: activeContactId,
        text: textToSend,
      });
      console.log("Mensagem enviada com sucesso pela API.");
    } catch (error) {
      console.error("Falha ao enviar mensagem pela API:", error);
      // No futuro, podemos adicionar uma lógica para marcar a mensagem como "não enviada" na UI.
    }
  };

  return (
    <div className="flex items-center p-3 bg-zinc-800 border-t border-zinc-700">
      <div className="flex items-center gap-3 text-zinc-400">{/* ... ícones ... */}</div>
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder={activeContactId ? "Digite uma mensagem" : "Selecione uma conversa para começar"}
          className="w-full p-2 rounded-lg bg-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none disabled:opacity-50"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { handleSendMessage(); } }}
          disabled={!activeContactId} 
        />
      </div>
      <div>
        {messageText.trim() ? (
          <button onClick={handleSendMessage} disabled={!activeContactId}>
            <Send className="h-5 w-5" />
          </button>
        ) : (
          <button disabled={!activeContactId}>
            <Mic className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}