import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/lib/theme-provider"
import { openSans } from "@/config/font-config"
import "./globals.css"


export const metadata: Metadata = {
  title: "NexTalk - by crdavip",
  description: "Aplicación de mensajería con inteligencia artificial",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${openSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
