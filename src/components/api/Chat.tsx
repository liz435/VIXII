"use client"
import { useChat } from "@ai-sdk/react"
import { useEffect, useRef } from "react"
import { Send, Loader2, MessageCircle } from 'lucide-react'

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, stop } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  // Auto-scroll - non-blocking
  useEffect(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    })
  }, [messages])

  // Non-blocking form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Non-blocking submission
    requestAnimationFrame(() => {
      handleSubmit(e)
    })
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center py-8 text-sm">
            <div className="mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="font-medium text-gray-700 mb-1">Hello! I&apos;m your AI assistant</div>
            <div className="text-xs">Ask me anything about Web3 and DeFi!</div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
              </div>
            </div>
          ))
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl rounded-bl-md max-w-[85%] text-sm">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
                <button onClick={stop} className="text-xs text-red-500 hover:text-red-700 underline ml-2">
                  Stop
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex justify-start">
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl rounded-bl-md max-w-[85%] text-sm">
              <div className="font-medium mb-1">Error</div>
              <div>{error.message}</div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            className="flex-1 p-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 placeholder-gray-500"
            value={input}
            placeholder="Ask me anything..."
            onChange={handleInputChange}
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[48px]"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>

        {/* Quick actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => handleInputChange({ target: { value: "What is DeFi?" } } as any)}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            What is DeFi?
          </button>
          <button
            onClick={() => handleInputChange({ target: { value: "Explain yield farming" } } as any)}
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
            disabled={isLoading}
          >
            Yield farming
          </button>
        </div>
      </div>
    </div>
  )
}
