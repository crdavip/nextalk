"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Logo } from "./logo"

export function SidebarHeader() {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Logo />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar" className="pl-9 bg-muted/50 border-0 h-9" />
      </div>
    </div>
  )
}
