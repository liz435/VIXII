"use client"
import { useState } from "react"
import { MessageCircle, X, ArrowLeftFromLineIcon, Lightbulb } from "lucide-react"
import Chat from "./Chat"


export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Vertical Tab Button - Always clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-3/4 right-0 -translate-y-1/2 z-50 bg-black hover:bg-gray-700 text-white px-3 py-6 rounded-full shadow-lg duration-300 ease-out hover:scale-105 hover:-translate-x-5 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] active:scale-95 active:translate-x-0 flex flex-col items-center gap-2 min-h-[100px] justify-center"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >

        <Lightbulb strokeWidth={2} className=" h-7 w-7 transition-transform duration-300 group-hover:rotate-12" />
        
        {/* <span className="text-sm font-medium">AI Chat</span> */}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed top-4 right-4 bottom-4 w-96 max-w-[calc(100vw-2rem)] z-40 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-black text-white p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
                         <img
                            alt="VIXII"
                            src="/logo/VIXII.svg"
                            className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
                        />
              <span className="font-semibold">VIXII Assistant</span>
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
