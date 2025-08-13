// src/components/MessageBubble.tsx (versão corrigida)
import { cn } from "@/lib/utils";
import { Message } from "@/types";

// A correção está aqui: Trocamos 'interface ... extends' por 'type ... ='
type MessageBubbleProps = Pick<Message, 'text' | 'time' | 'sentBy'>;

export function MessageBubble({ text, time, sentBy }: MessageBubbleProps) {
  const isSentByMe = sentBy === 'me';
  
  return (
    <div
      className={cn(
        "flex flex-col p-3 rounded-lg max-w-md",
        {
          "bg-green-900 self-end": isSentByMe,
          "bg-zinc-700 self-start": !isSentByMe,
        }
      )}
    >
      <p className="text-white break-words">{text}</p>
      <p className="text-xs text-zinc-400 self-end mt-1">{time}</p>
    </div>
  );
}