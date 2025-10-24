"use client"

import { useConversations } from "@/lib/conversations-context"
import { Button } from "@/components/ui/button"
import { Menu, MessageSquarePlus } from "lucide-react"
import { Isotipo } from "./isotipo"

interface WelcomeScreenProps {
  onMenuClick: () => void
}

export function WelcomeScreen({ onMenuClick }: WelcomeScreenProps) {
  const { createConversation } = useConversations()

  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Buenos Días" : currentHour < 18 ? "Buenas Tardes" : "Buenas Noches"

  return (
    <div className="flex-1 flex flex-col">
      <div className="h-14 md:h-16 border-b border-border bg-card flex items-center justify-between px-3 md:px-6">
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>

          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xs md:text-sm font-semibold text-primary">AI</span>
          </div>
          <span className="text-xs md:text-sm font-medium">4o-mini</span>
        </div>

        <button
          onClick={createConversation}
          className="flex px-3 md:px-2 py-1.5 md:py-2 bg-foreground text-background rounded-lg text-xs md:text-sm font-medium hover:bg-foreground/90 transition-colors cursor-pointer"
        >
          <span className="hidden sm:flex sm:items-center sm:gap-1"><MessageSquarePlus /> Nuevo Chat</span>
          <span className="flex items-center gap-1 sm:hidden"><MessageSquarePlus /> Chat</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 md:px-8 py-8">
        <div className="max-w-2xl w-full text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 flex items-center justify-center">
            <Isotipo animation={true} />
          </div>

          <h1 className="text-2xl md:text-4xl mb-2 text-balance">{greeting}, Alejandro</h1>
          <p className="text-2xl md:text-4xl font-bold text-balance">
            ¿Cómo puedo{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              asistirte hoy?
            </span>
          </p>

          <div className="mt-8 md:mt-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Inicia una consulta..."
                className="w-full px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                onFocus={createConversation}
              />

              <div className="flex flex-wrap items-center gap-2 mt-3 md:mt-4 justify-center">
                <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-border bg-card hover:bg-accent text-xs md:text-sm flex items-center gap-1.5 md:gap-2 transition-colors">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="hidden sm:inline">Razonamiento</span>
                  <span className="sm:hidden">Razonar</span>
                </button>
                <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-border bg-card hover:bg-accent text-xs md:text-sm flex items-center gap-1.5 md:gap-2 transition-colors">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <button className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-border bg-card hover:bg-accent text-xs md:text-sm flex items-center gap-1.5 md:gap-2 transition-colors">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
