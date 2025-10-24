"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Settings, LogOut, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useConversations } from "@/lib/conversations-context"
import Image from "next/image"

export function SidebarFooter() {
  const { theme, setTheme } = useTheme()
  const { clearAllConversations } = useConversations()

  const handleLogout = () => {
    clearAllConversations()
    window.location.reload()
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="p-3 border-t border-border flex items-center gap-3">
      <Avatar className="w-9 h-9">
        <Image src={"/avatar.png"} alt="Avatar" width={100} height={100} priority={false} />
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">Alejandro Rojas</p>
        <p className="text-xs text-muted-foreground truncate">alejandro@ezcala.ai</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <Settings className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 mr-2" />
                Modo Claro
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-2" />
                Modo Oscuro
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
