// src/app/api/send/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sendWhatsappMessage } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  try {
    // Pega os dados enviados pelo nosso frontend
    const body = await request.json();
    const { to, text } = body;

    // Validação simples para garantir que temos os dados necessários
    if (!to || !text) {
      return NextResponse.json({ error: 'Destinatário (to) e texto (text) são obrigatórios' }, { status: 400 });
    }

    console.log(`Recebida requisição para enviar "${text}" para ${to}`);

    // Usa nossa função segura do 'lib' para enviar a mensagem
    const success = await sendWhatsappMessage(to, text);

    if (success) {
      return NextResponse.json({ status: 'success', message: 'Mensagem enviada' });
    } else {
      return NextResponse.json({ status: 'error', message: 'Falha ao enviar mensagem pelo serviço do WhatsApp' }, { status: 500 });
    }

  } catch (error) {
    console.error('Erro na API de envio:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}