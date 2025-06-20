"use client"
import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

export default function FloatingChatDebug() {
  const [mounted, setMounted] = useState(false)
  const [debugInfo, setDebugInfo] = useState("")

  useEffect(() => {
    console.log("FloatingChatDebug: Component mounting...")
    setMounted(true)
    setDebugInfo("Component mounted successfully")

    // Test if we can see the component
    setTimeout(() => {
      const element = document.querySelector('[data-testid="floating-chat"]')
      console.log("FloatingChatDebug: Element found:", !!element)
      setDebugInfo((prev) => prev + " | Element in DOM: " + !!element)
    }, 1000)
  }, [])

  console.log("FloatingChatDebug: Rendering, mounted:", mounted)

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Debug info overlay */}
      <div className="fixed top-4 left-4 z-[9999] bg-black text-white p-2 text-xs rounded">Debug: {debugInfo}</div>

      {/* Simple floating button */}
      <div
        data-testid="floating-chat"
        className="fixed bottom-6 right-6 z-50 bg-red-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-red-600"
        onClick={() => alert("Chat button clicked!")}
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">TEST</div>
      </div>
    </>
  )
}
