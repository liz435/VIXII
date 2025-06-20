"use client"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Minus, Maximize2, Minimize2, Lock, Unlock } from 'lucide-react'
import Chat from "./Chat"

export default function FloatingChat() {
  const [isLocked, setIsLocked] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isInBentoSection, setIsInBentoSection] = useState(false)

  // Handle SSR
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Intersection Observer to detect BentoSection (for auto-unlock)
  useEffect(() => {
    if (!isMounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInBentoSection(entry.isIntersecting)
          // Auto-unlock when entering BentoSection
          if (entry.isIntersecting && isLocked) {
            setIsLocked(false)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const bentoSection = document.querySelector('[data-section="bento"]')
    if (bentoSection) {
      observer.observe(bentoSection)
    }

    return () => {
      if (bentoSection) {
        observer.unobserve(bentoSection)
      }
    }
  }, [isMounted, isLocked])

  // Toggle functions
  const toggleLock = useCallback(() => {
    setIsLocked((prev) => !prev)
    if (!isLocked) {
      setIsExpanded(false) // Close chat when locking
    }
  }, [isLocked])

  const toggleExpanded = useCallback(() => {
    if (isLocked) return
    setIsExpanded((prev) => !prev)
  }, [isLocked])

  const toggleMaximized = useCallback(() => {
    setIsMaximized((prev) => !prev)
  }, [])

  // Always render after mounting (no conditional rendering)
  if (!isMounted) {
    return null
  }

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      }}
      className={`fixed z-50 ${isMaximized ? "inset-4" : "bottom-6 right-6"}`}
    >
      <div className="relative">
        {/* Lock/Unlock Toggle Button */}
        <motion.button
          onClick={toggleLock}
          className={`absolute z-20 flex h-8 w-8 items-center justify-center rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            isMaximized ? "top-2 left-2" : "-left-10 top-2"
          } ${
            isLocked
              ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
              : "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isLocked ? "Click to unlock chat" : "Click to lock chat"}
        >
          {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
        </motion.button>

        {/* Main Toggle Button (Expand/Collapse) */}
        <motion.button
          onClick={toggleExpanded}
          disabled={isLocked}
          className={`absolute z-10 flex h-10 w-10 items-center justify-center rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
            isMaximized ? "top-4 left-4" : "-left-12 top-4"
          } ${
            isLocked
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 cursor-pointer"
          }`}
          whileHover={!isLocked ? { scale: 1.1 } : {}}
          whileTap={!isLocked ? { scale: 0.95 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="minus"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Minus className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Chat Window */}
        <AnimatePresence>
          {isExpanded && !isLocked && (
            <motion.div
              initial={{ scale: 0, opacity: 0, transformOrigin: "bottom right" }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, transformOrigin: "bottom right" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.3,
              }}
              className={`rounded-lg shadow-2xl ${isMaximized ? "h-full w-full" : "w-96 max-w-[calc(100vw-3rem)]"}`}
            >
              <div className="h-full rounded-lg border border-gray-200 bg-white shadow-xl">
                {/* Chat Header */}
                <div className="flex items-center justify-between rounded-t-lg bg-blue-500 px-4 py-3 text-white">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <h3 className="font-semibold">AI Assistant</h3>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs">Online</span>
                    </div>
                    <button onClick={toggleMaximized} className="rounded p-1 hover:bg-blue-600 transition-colors">
                      {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Chat Content */}
                <div className={`overflow-hidden ${isMaximized ? "h-[calc(100%-60px)]" : "h-[500px]"}`}>
                  <Chat />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button (when collapsed) */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                isLocked
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white cursor-pointer hover:bg-blue-600 hover:shadow-xl"
              }`}
              onClick={toggleExpanded}
              whileHover={!isLocked ? { scale: 1.05 } : {}}
              whileTap={!isLocked ? { scale: 0.95 } : {}}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Badge */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white transition-colors ${
                isLocked ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {isLocked ? <Lock className="h-3 w-3" /> : "✓"}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Text */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap pointer-events-none"
            >
              {isLocked ? "Chat Locked" : "Chat Ready"}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Auto-unlock notification */}
        <AnimatePresence>
          {isInBentoSection && isLocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute right-0 -top-16 bg-blue-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg"
            >
              🎉 Chat auto-unlocked!
              <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1 w-2 h-2 bg-blue-500 rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
