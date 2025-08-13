// src/components/MainToolbar.tsx (versão final sem Comunidades)
"use client";

import { MessageSquare, Wrench, Settings } from "lucide-react"; // "Users" foi removido
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MainToolbar() {
  // O componente interno para criar os ícones continua o mesmo
  const ToolbarIcon = ({ icon: Icon, text, href }: { icon: React.ElementType, text: string, href: string }) => (
    <Link href={href}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="p-2 w-full rounded-lg hover:bg-zinc-700 cursor-pointer flex items-center justify-center">
            <Icon className="h-6 w-6 text-zinc-400" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{text}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );

  return (
    <div className="flex flex-col h-full justify-between items-center py-4">
      {/* Ícones do Topo */}
      <div className="flex flex-col gap-4 w-full px-2">
        <ToolbarIcon href="/" icon={MessageSquare} text="Conversas" />
        {/* A linha de Comunidades foi removida daqui */}
        <ToolbarIcon href="/ai-settings" icon={Wrench} text="Configurações da IA" />
      </div>

      {/* Ícones da Base */}
      <div className="flex flex-col gap-4 items-center w-full px-2">
        <ToolbarIcon href="/settings" icon={Settings} text="Configurações" />
        <Link href="/profile">
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/uGuilhermeOliveiraa2005.png" alt="Seu Avatar" />
              <AvatarFallback>GO</AvatarFallback>
            </Avatar>
        </Link>
      </div>
    </div>
  );
}