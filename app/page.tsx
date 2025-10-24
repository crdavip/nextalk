import { ConversationsProvider } from "@/lib/conversations-context"
import { ChatLayout } from "@/components/chat-layout"

export default function Home() {
  return (
    <ConversationsProvider>
      <ChatLayout />
    </ConversationsProvider>
  )
}
