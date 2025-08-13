// src/lib/whatsapp.ts (versão com tratamento de erro seguro)

import axios, { isAxiosError } from 'axios'; // Importamos o verificador de erro do Axios

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const API_VERSION = 'v19.0';
const WHATSAPP_API_URL = `https://graph.facebook.com/${API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

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

  } catch (error) {
    // --- A CORREÇÃO ESTÁ AQUI ---
    // Verificamos se o erro é do tipo que o Axios gera
    if (isAxiosError(error)) {
      console.error('Erro ao enviar mensagem pelo WhatsApp (Axios):', error.response?.data || error.message);
    } else {
      // Caso seja um erro diferente
      console.error('Erro inesperado ao enviar mensagem:', error);
    }
    return false;
  }
}