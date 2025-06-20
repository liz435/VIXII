"use client"
import { useEffect, useState } from "react"

export default function TestVisibility() {
  const [tests, setTests] = useState<string[]>([])

  useEffect(() => {
    const runTests = () => {
      const results: string[] = []

      // Test 1: Can we create a simple div?
      const testDiv = document.createElement("div")
      testDiv.style.cssText = `
        position: fixed;
        top: 50px;
        left: 50px;
        width: 100px;
        height: 100px;
        background: red;
        z-index: 999999;
      `
      document.body.appendChild(testDiv)

      setTimeout(() => {
        const rect = testDiv.getBoundingClientRect()
        results.push(`Test div visible: ${rect.width > 0 && rect.height > 0}`)
        document.body.removeChild(testDiv)

        // Test 2: Check viewport
        results.push(`Viewport: ${window.innerWidth}x${window.innerHeight}`)

        // Test 3: Check scroll position
        results.push(`Scroll: ${window.scrollX}, ${window.scrollY}`)

        // Test 4: Check if our chat element exists
        const chatEl = document.querySelector('[data-testid="obvious-chat"]')
        results.push(`Chat element exists: ${!!chatEl}`)

        if (chatEl) {
          const chatRect = chatEl.getBoundingClientRect()
          results.push(`Chat position: ${chatRect.left}, ${chatRect.top}`)
          results.push(`Chat size: ${chatRect.width}x${chatRect.height}`)
          results.push(`Chat visible: ${chatRect.width > 0 && chatRect.height > 0}`)
        }

        setTests(results)
      }, 1000)
    }

    runTests()
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        top: "200px",
        left: "16px",
        backgroundColor: "rgba(0,0,0,0.9)",
        color: "white",
        padding: "12px",
        fontSize: "12px",
        borderRadius: "4px",
        zIndex: 1000000,
        fontFamily: "monospace",
        maxWidth: "300px",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Visibility Tests:</div>
      {tests.map((test, index) => (
        <div key={index} style={{ marginBottom: "2px" }}>
          {test}
        </div>
      ))}
    </div>
  )
}
