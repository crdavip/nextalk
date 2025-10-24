"use client"

import { Home, Compass, Library, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SidebarNavigation() {
  return (
    <nav className="flex flex-col gap-1 px-2 py-4 border-b border-border">
      <Button variant="ghost" className="justify-start gap-3 h-10 px-3">
        <Home className="w-5 h-5" />
        <span className="text-sm">Inicio</span>
      </Button>
      <Button variant="ghost" className="justify-start gap-3 h-10 px-3">
        <Compass className="w-5 h-5" />
        <span className="text-sm">Explorar</span>
      </Button>
      <Button variant="ghost" className="justify-start gap-3 h-10 px-3">
        <Library className="w-5 h-5" />
        <span className="text-sm">Biblioteca</span>
      </Button>
      <Button variant="ghost" className="justify-start gap-3 h-10 px-3">
        <Clock className="w-5 h-5" />
        <span className="text-sm">Historial</span>
      </Button>
    </nav>
  )
}
