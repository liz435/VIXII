'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lightbulb } from 'lucide-react'
import Chat from './Chat'

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  // Detect clicks outside the chat window
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {/* Animated Button */}
      <motion.div
  animate={{
    x: isOpen ? 150 : 0,
    opacity: isOpen ? 0 : 1,
  }}
  transition={{
    type: 'spring',
    stiffness: 120,     // softer spring
    damping: 8,         // more bounce
    mass: 0.5,
  }}
  className="fixed top-3/4 right-0 -translate-y-1/2 z-50"
>
  <motion.button
    onClick={() => setIsOpen(true)}
    whileHover={{
      scale: 1.1,
      rotate: [0, 3, -3, 2, -1, 0],
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    }}
    whileTap={{ scale: 0.95 }}
    className="bg-black hover:bg-gray-700 text-white px-3 py-6 rounded-full shadow-xl flex flex-col items-center gap-2 min-h-[100px] justify-center"
    style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
  >
    <Lightbulb strokeWidth={2} className="h-7 w-7" />
  </motion.button>
</motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            key="chat"
            initial={{
              x: 500,
              opacity: 0,
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            }}
            animate={{
              x: 0,
              opacity: 1,
              borderRadius: "20px",
              transition: {
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1],
              },
            }}
            exit={{
              x: 100,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: 'easeInOut',
              },
            }}
            className="fixed top-4 right-4 bottom-4 w-96 max-w-[calc(100vw-2rem)] z-40 bg-white shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
