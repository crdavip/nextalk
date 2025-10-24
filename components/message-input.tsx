"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (content: string) => void
  disabled?: boolean
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !disabled) {
      onSendMessage(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-border bg-card p-3 md:p-6">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 rounded-2xl border border-border bg-background focus-within:ring-2 focus-within:ring-primary/20">
            <Button type="button" variant="ghost" size="icon" className="h-7 w-7 md:h-8 md:w-8 shrink-0">
              <Paperclip className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </Button>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Inicia una consulta..."
              className="flex-1 bg-transparent border-0 outline-none resize-none min-h-[24px] max-h-[120px] text-sm"
              disabled={disabled}
              rows={1}
            />

            <Button
              type="submit"
              size="icon"
              className="h-8 w-8 md:h-9 md:w-9 rounded-full shrink-0"
              disabled={disabled || !message.trim()}
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 md:mt-3 overflow-x-auto pb-1 scrollbar-hide">
          <button
            type="button"
            className="px-2.5 md:px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs flex items-center gap-1.5 md:gap-2 transition-colors whitespace-nowrap"
          >
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="hidden sm:inline">Razonamiento</span>
            <span className="sm:hidden">Razonar</span>
          </button>
          <button
            type="button"
            className="px-2.5 md:px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs flex items-center gap-1.5 md:gap-2 transition-colors whitespace-nowrap"
          >
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="hidden sm:inline">Crear Imagen</span>
            <span className="sm:hidden">Imagen</span>
          </button>
          <button
            type="button"
            className="px-2.5 md:px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-accent text-xs flex items-center gap-1.5 md:gap-2 transition-colors whitespace-nowrap"
          >
            <svg className="w-3 h-3 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline">Búsqueda Profunda</span>
            <span className="sm:hidden">Buscar</span>
          </button>
        </div>
      </form>
    </div>
  )
}
