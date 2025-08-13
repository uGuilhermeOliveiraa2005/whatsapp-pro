// src/app/api/whatsapp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import { Message } from '@/types';

// Função para verificação do Webhook pela Meta (roda apenas uma vez)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('Webhook verificado com sucesso!');
    return new NextResponse(challenge, { status: 200 });
  } else {
    console.error('Falha na verificação do webhook.');
    return new NextResponse('Forbidden', { status: 403 });
  }
}

// Função para receber as mensagens do WhatsApp
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Webhook do WhatsApp recebeu:', JSON.stringify(body, null, 2));

    const messagePayload = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (messagePayload?.type === 'text') {
      const contactId = messagePayload.from; // Número de quem enviou
      const text = messagePayload.text.body; // O texto da mensagem
      const messageId = messagePayload.id; // ID da mensagem do WhatsApp

      const currentTime = new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // Criamos o objeto de mensagem no nosso formato padrão
      const newMessage: Message = {
        id: messageId,
        text: text,
        time: currentTime,
        sentBy: 'contact', 
      };

      // A MÁGICA ACONTECE AQUI:
      // Disparamos um evento para o Pusher, notificando nossa interface
      await pusherServer.trigger('chat-channel', 'new-message', {
        contactId,
        message: newMessage,
      });

      console.log(`Mensagem de ${contactId} enviada para o Pusher.`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}