"use client"
import { useState } from "react"
import { MessageCircle } from "lucide-react"
import Chat from "./Chat"

export default function FloatingChatObvious() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* SUPER OBVIOUS BUTTON - Can't miss this! */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999999,
          width: "80px",
          height: "80px",
          backgroundColor: "#ff0000", // Bright red
          border: "5px solid #ffff00", // Yellow border
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 0 30px rgba(255, 0, 0, 0.8)", // Red glow
          animation: "pulse 2s infinite",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={32} color="white" />

        {/* Animated ring */}
        <div
          style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            right: "-10px",
            bottom: "-10px",
            border: "3px solid #00ff00", // Green ring
            borderRadius: "50%",
            animation: "spin 3s linear infinite",
          }}
        />

        {/* Text label */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
            whiteSpace: "nowrap",
          }}
        >
          CLICK ME!
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "120px",
            right: "24px",
            width: "400px",
            maxWidth: "calc(100vw - 48px)",
            height: "600px",
            backgroundColor: "#ffffff",
            border: "3px solid #ff0000",
            borderRadius: "12px",
            boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
            zIndex: 999998,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#ff0000",
              color: "white",
              padding: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MessageCircle size={24} />
              AI CHAT IS WORKING!
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: "transparent",
                border: "2px solid white",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              ✕
            </button>
          </div>

          {/* Chat Content */}
          <div style={{ height: "calc(100% - 80px)", overflow: "hidden" }}>
            <Chat />
          </div>
        </div>
      )}

      {/* Status indicator */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: "24px",
          transform: "translateY(-50%)",
          backgroundColor: isOpen ? "#00ff00" : "#ff0000",
          color: "white",
          padding: "12px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "bold",
          zIndex: 999997,
          border: "2px solid #000",
        }}
      >
        CHAT: {isOpen ? "OPEN" : "CLOSED"}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
