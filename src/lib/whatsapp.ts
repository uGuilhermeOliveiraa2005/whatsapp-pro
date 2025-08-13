// src/lib/whatsapp.ts

import axios from 'axios';

// Pega as variáveis de ambiente que configuramos
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// URL base da API de Grafos do Facebook para a versão 19.0
const API_VERSION = 'v19.0';
const WHATSAPP_API_URL = `https://graph.facebook.com/${API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

/**
 * Função para enviar uma mensagem de texto simples via API do WhatsApp.
 * @param to O número de telefone do destinatário (com código do país, ex: 5551999999999).
 * @param text O conteúdo da mensagem a ser enviada.
 */
export async function sendWhatsappMessage(to: string, text: string): Promise<boolean> {
  console.log(`Enviando mensagem para ${to}: "${text}"`);

  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: 'whatsapp',
        to: to,
        text: { body: text },
      },
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Mensagem enviada com sucesso:', response.data);
    return true;

  } catch (error: any) {
    console.error('Erro ao enviar mensagem pelo WhatsApp:', error.response?.data || error.message);
    return false;
  }
}