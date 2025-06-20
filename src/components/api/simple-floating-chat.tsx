"use client"
import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import Chat from "./Chat"

export default function SimpleFloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-2xl border">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-500 text-white p-3 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">AI Chat</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 p-1 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="h-[500px]">
            <Chat />
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}
