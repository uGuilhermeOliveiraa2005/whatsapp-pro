import axios, { isAxiosError } from 'axios';

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const API_VERSION = 'v19.0';
const WHATSAPP_API_URL = `https://graph.facebook.com/${API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

/**
 * Função para enviar uma mensagem de texto via API do WhatsApp.
 * Inclui um modo de simulação para desenvolvimento sem um número de teste.
 * @param to O número de telefone do destinatário.
 * @param text O conteúdo da mensagem a ser enviada.
 */
export async function sendWhatsappMessage(to: string, text: string): Promise<boolean> {
  
  // --- MODO DE SIMULAÇÃO ---
  // Verifica se a variável de ambiente MOCK_WHATSAPP_API está definida como "true".
  if (process.env.MOCK_WHATSAPP_API === "true") {
    console.log("--- MODO SIMULAÇÃO ATIVO ---");
    console.log(`Mensagem SIMULADA para ${to}: "${text}"`);
    
    // Adiciona um pequeno delay para simular uma chamada de rede real
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    console.log("Simulação de envio concluída com sucesso.");
    return true; // Retorna sucesso imediatamente, sem chamar a API da Meta.
  }
  // -------------------------

  console.log(`Enviando mensagem REAL para ${to}: "${text}"`);
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
    if (isAxiosError(error)) {
      console.error('Erro ao enviar mensagem pelo WhatsApp (Axios):', error.response?.data || error.message);
    } else {
      console.error('Erro inesperado ao enviar mensagem:', error);
    }
    return false;
  }
}