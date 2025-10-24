"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import type { Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Isotipo } from "./isotipo";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3 mb-4", isUser && "flex-row-reverse")}>
      <Avatar className="w-8 h-8 shrink-0">
        <AvatarFallback className={cn(isUser ? "bg-primary" : "bg-primary/10")}>
          {isUser ? <Image src={"/avatar.png"} alt="Avatar" width={100} height={100} priority={false} />: <Isotipo className="w-8! h-8!" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-col max-w-[70%]", isUser && "items-end")}>
        <div
          className={cn(
            "rounded-lg px-4 py-2 wrap-break-word",
            isUser ? "bg-primary text-primary-foreground" : "bg-card border border-border"
          )}
        >
          <div className="text-sm leading-relaxed prose prose-sm max-w-none">
            {message.content.split("\n").map((line, i) => (
              <span key={i}>
                {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                  part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={j} className="font-semibold">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
                {i < message.content.split("\n").length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
