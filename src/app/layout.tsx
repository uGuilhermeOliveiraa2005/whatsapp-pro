import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainToolbar } from "@/components/MainToolbar";
import { ContactList } from "@/components/ContactList";
import { PusherListener } from "@/components/PusherListener";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WA Automator",
  description: "Seu automatizador de WhatsApp com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* Este componente invisível escuta por novas mensagens em tempo real */}
        <PusherListener />
        
        {/* Layout visual principal da aplicação */}
        <main className="flex h-screen bg-zinc-900 text-white">
          
          {/* Coluna 1: Barra de Ferramentas Esquerda (compartilhada) */}
          <aside className="w-20 bg-zinc-950">
            <MainToolbar />
          </aside>

          {/* Coluna 2: Painel de Contatos (compartilhado) */}
          <aside className="w-1/3 max-w-sm bg-zinc-900 border-r border-zinc-700">
            <ContactList />
          </aside>

          {/* Coluna 3: Conteúdo da Página Atual (renderiza a página ativa) */}
          <section className="flex-1 flex flex-col">
            {children} 
          </section>

        </main>
      </body>
    </html>
  );
}