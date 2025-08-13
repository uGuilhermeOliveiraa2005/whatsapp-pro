// src/types/index.ts

/**
 * Representa uma única mensagem na conversa.
 */
export interface Message {
  id: string; // ID único da mensagem, pode ser fornecido pela API do WhatsApp
  text: string;
  time: string;
  sentBy: 'me' | 'contact'; // 'me' para nós/IA, 'contact' para o cliente
}

/**
 * Representa uma conversa inteira, associada a um contato.
 */
export interface Conversation {
  contactId: string; // Número de telefone do contato (ex: "5551999999999")
  contactName: string;
  contactAvatar: string;
  messages: Message[];
  lastMessageAt: Date; // Para ordenar a lista de contatos
}