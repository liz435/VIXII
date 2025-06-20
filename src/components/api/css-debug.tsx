"use client"
import { useEffect, useState } from "react"

export default function CSSDebug() {
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  useEffect(() => {
    const info: string[] = []

    // Check for common CSS issues
    const body = document.body
    const html = document.documentElement

    // Check overflow settings
    const bodyOverflow = window.getComputedStyle(body).overflow
    const htmlOverflow = window.getComputedStyle(html).overflow
    info.push(`Body overflow: ${bodyOverflow}`)
    info.push(`HTML overflow: ${htmlOverflow}`)

    // Check for transform/perspective that might create stacking context
    const bodyTransform = window.getComputedStyle(body).transform
    const htmlTransform = window.getComputedStyle(html).transform
    info.push(`Body transform: ${bodyTransform}`)
    info.push(`HTML transform: ${htmlTransform}`)

    // Check SmoothScrollProvider wrapper
    const smoothScrollEl =
      document.querySelector("[data-scroll-container]") ||
      document.querySelector(".smooth-scroll") ||
      document.querySelector('[class*="smooth"]')

    if (smoothScrollEl) {
      const smoothStyles = window.getComputedStyle(smoothScrollEl)
      info.push(`SmoothScroll found: ${smoothScrollEl.className}`)
      info.push(`SmoothScroll overflow: ${smoothStyles.overflow}`)
      info.push(`SmoothScroll position: ${smoothStyles.position}`)
      info.push(`SmoothScroll z-index: ${smoothStyles.zIndex}`)
    } else {
      info.push("No SmoothScroll element found")
    }

    // Check for any fixed positioned elements
    const fixedElements = Array.from(document.querySelectorAll("*")).filter((el) => {
      return window.getComputedStyle(el).position === "fixed"
    })
    info.push(`Fixed elements count: ${fixedElements.length}`)

    setDebugInfo(info)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: "100px",
        left: "16px",
        backgroundColor: "rgba(0,0,0,0.9)",
        color: "white",
        padding: "12px",
        fontSize: "11px",
        borderRadius: "4px",
        zIndex: 100001,
        fontFamily: "monospace",
        maxWidth: "300px",
        maxHeight: "400px",
        overflow: "auto",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>CSS Debug Info:</div>
      {debugInfo.map((info, index) => (
        <div key={index} style={{ marginBottom: "2px" }}>
          {info}
        </div>
      ))}
    </div>
  )
}
