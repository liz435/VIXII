"use client"
import { useState } from "react"
import { MessageCircle, X } from "lucide-react"
import Chat from "./Chat"

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Vertical Tab Button - Always clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-6 rounded-l-lg shadow-lg transition-colors duration-200 flex flex-col items-center gap-2 min-h-[100px] justify-center"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <MessageCircle className="h-5 w-5" />
        <span className="text-sm font-medium">AI Chat</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed top-4 right-4 bottom-4 w-96 max-w-[calc(100vw-2rem)] z-40 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            <Chat />
          </div>
        </div>
      )}
    </>
  )
}
