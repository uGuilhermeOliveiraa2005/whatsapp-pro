// src/components/MessageBubble.tsx
import { cn } from "@/lib/utils";
import { Message } from "@/types";

// Usamos Pick para pegar apenas as propriedades que este componente precisa
interface MessageBubbleProps extends Pick<Message, 'text' | 'time' | 'sentBy'> {}

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
      <p className="text-white">{text}</p>
      <p className="text-xs text-zinc-400 self-end mt-1">{time}</p>
    </div>
  );
}