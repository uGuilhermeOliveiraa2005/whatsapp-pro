// src/store/mock-data.ts
import { Conversation } from "@/types";

export const mockConversations: Conversation[] = [
  {
    contactId: "5511987654321",
    contactName: "Pai",
    contactAvatar: "https://github.com/shadcn.png",
    lastMessageAt: new Date(new Date().setDate(new Date().getDate() - 1)), // Ontem
    messages: [
      { id: 'msg1', text: "Olá, filho! Tudo bem?", time: "10:35", sentBy: 'contact' },
      { id: 'msg2', text: "Oi, pai! Tudo certo por aqui. E com você?", time: "10:36", sentBy: 'me' },
    ]
  },
  {
    contactId: "5521912345678",
    contactName: "Cliente TV Samsung",
    contactAvatar: "https://github.com/shadcn.png",
    lastMessageAt: new Date(), // Hoje
    messages: [
        { id: 'msg3', text: "Bom dia, quanto fica o conserto da minha TV Samsung?", time: "09:15", sentBy: 'contact' },
    ]
  },
  {
    contactId: "5551955554444",
    contactName: "Fornecedor Peças",
    contactAvatar: "https://github.com/shadcn.png",
    lastMessageAt: new Date(new Date().setDate(new Date().getDate() - 2)), // Anteontem
    messages: []
  }
];