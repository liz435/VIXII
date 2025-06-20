"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import gsap from "gsap"

const svgNames = [
  "bitcoin-btc-logo.svg",
  "ethereum-eth-logo.svg",
  "jupiter-ag-jup-logo.svg",
  "solana-sol-logo.svg",
  "tether-usdt-logo.svg",
  "usd-coin-usdc-logo.svg",
]

let remainingSvgs = [...svgNames]

function getUniqueRandomSvg() {
  if (remainingSvgs.length === 0) {
    remainingSvgs = [...svgNames]
  }
  const index = Math.floor(Math.random() * remainingSvgs.length)
  const name = remainingSvgs[index]
  remainingSvgs.splice(index, 1)
  return name
}

interface SvgRainProps {
  targetSelector?: string
  speedThreshold?: number
  spawnRate?: number
  debug?: boolean
}

export default function SvgRain({
  targetSelector = ".interactive-section",
  speedThreshold = 50,
  spawnRate = 3,
  debug = false,
}: SvgRainProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [debugInfo, setDebugInfo] = useState({
    inTarget: false,
    spawned: 0,
  })

  const spawnSvg = useCallback(
    (mouseX: number, mouseY: number, speed: number) => {
      const targetElement = document.querySelector(targetSelector)
      if (!targetElement || !containerRef.current) return

      const targetRect = targetElement.getBoundingClientRect()

      // Since container is positioned fixed over the target section,
      // we can use click coordinates directly relative to the container
      const relativeX = mouseX - targetRect.left
      const relativeY = mouseY - targetRect.top

      const name = getUniqueRandomSvg()
      const img = document.createElement("img")
      img.src = `/logo-cluster/${name}`
      img.className = "falling-svg"

      const size = Math.min(Math.max(30, 30), 50)
      img.style.width = `${size}px`
      img.style.height = `${size}px`
      img.style.position = "absolute"
      img.style.left = `${relativeX - size / 2}px`
      img.style.top = `${relativeY - size / 2}px`
      img.style.pointerEvents = "none"
      img.style.zIndex = "1000"

      containerRef.current.appendChild(img)

      if (debug) {
        setDebugInfo((prev) => ({ ...prev, spawned: prev.spawned + 1 }))
      }

      // Calculate fall distance within the section bounds
      const fallDistance = targetRect.height - relativeY + 100
      const duration = 1.5 // Fixed duration for consistency

      gsap.to(img, {
        y: fallDistance,
        rotation: Math.random() * 360,
        scale: 0.5,
        duration: duration,
        ease: "power2.in",
        onComplete: () => {
          gsap.to(img, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => img.remove(),
          })
        },
      })
    },
    [targetSelector, debug],
  )

  const isInTargetArea = useCallback(
    (x: number, y: number): boolean => {
      const targetElement = document.querySelector(targetSelector)
      if (!targetElement) return false

      const rect = targetElement.getBoundingClientRect()
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    },
    [targetSelector],
  )

  // Position the container relative to the target section
  useEffect(() => {
    const updateContainerPosition = () => {
      const targetElement = document.querySelector(targetSelector)
      if (!targetElement || !containerRef.current) return

      const rect = targetElement.getBoundingClientRect()
      const container = containerRef.current

      container.style.position = "fixed"
      container.style.left = `${rect.left}px`
      container.style.top = `${rect.top}px`
      container.style.width = `${rect.width}px`
      container.style.height = `${rect.height}px`
    }

    updateContainerPosition()

    // Update position on resize only
    const handleUpdate = () => updateContainerPosition()
    window.addEventListener("resize", handleUpdate)

    return () => {
      window.removeEventListener("resize", handleUpdate)
    }
  }, [targetSelector])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const inTarget = isInTargetArea(e.clientX, e.clientY)

      if (debug) {
        setDebugInfo((prev) => ({ ...prev, inTarget }))
      }

      if (inTarget) {
        // Spawn multiple SVGs on click for a more dramatic effect
        for (let i = 0; i < spawnRate; i++) {
          setTimeout(() => {
            spawnSvg(e.clientX, e.clientY, 50) // Use a fixed "speed" value
          }, i * 100) // Stagger the spawns slightly
        }
      }
    }

    window.addEventListener("click", handleClick)
    return () => {
      window.removeEventListener("click", handleClick)
    }
  }, [spawnSvg, isInTargetArea, spawnRate, debug])

  return (
    <>
      <div ref={containerRef} className="pointer-events-none overflow-hidden" style={{ zIndex: 50 }} />
      {debug && (
        <div className="fixed top-4 right-4 bg-black text-white p-4 rounded z-[9999] font-mono text-sm">
          <div>In Target: {debugInfo.inTarget ? "✅" : "❌"}</div>
          <div>Spawn Rate: {spawnRate}</div>
          <div>Spawned: {debugInfo.spawned}</div>
          <div>Selector: {targetSelector}</div>
        </div>
      )}
    </>
  )
}
