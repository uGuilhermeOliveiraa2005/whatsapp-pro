// src/components/PusherListener.tsx
"use client";

import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { useChatActions } from '@/store/chat-store';
import { Message } from '@/types';

// Payload esperado do nosso evento Pusher
interface NewMessagePayload {
  contactId: string;
  message: Message;
}

export function PusherListener() {
  const { addMessage } = useChatActions();

  useEffect(() => {
    // Inicializa o Pusher com as chaves PÚBLICAS do nosso .env
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    // Inscreve-se no canal que definimos no backend
    const channel = pusher.subscribe('chat-channel');

    // Fica "ouvindo" pelo evento 'new-message'
    channel.bind('new-message', (data: NewMessagePayload) => {
      console.log('Nova mensagem recebida do Pusher:', data);

      // A MÁGICA FINAL:
      // Quando uma mensagem chega do Pusher, chamamos a ação do nosso store
      // para adicionar a mensagem à conversa correta.
      addMessage(data.contactId, data.message);
    });

    // IMPORTANTE: Limpa a conexão quando o componente for "desmontado"
    // Isso evita vazamentos de memória e conexões duplicadas.
    return () => {
      pusher.unsubscribe('chat-channel');
      pusher.disconnect();
    };
  }, [addMessage]); // O array de dependências garante que o efeito seja gerenciado corretamente

  // Este componente não renderiza nada na tela, ele só trabalha nos bastidores.
  return null;
}