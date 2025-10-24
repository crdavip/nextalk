"use client"

import { Sparkles, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SidebarHeader() {
  return (
    <div className="flex flex-col gap-4 p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
        <h1 className="text-lg font-bold">NexTalk</h1>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Buscar" className="pl-9 bg-muted/50 border-0 h-9" />
      </div>
    </div>
  )
}
