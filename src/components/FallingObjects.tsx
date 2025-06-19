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
  const mouseDataRef = useRef({
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    frameCount: 0,
  })

  const [debugInfo, setDebugInfo] = useState({
    speed: 0,
    inTarget: false,
    spawned: 0,
  })

  const spawnSvg = useCallback(
    (mouseX: number, mouseY: number, speed: number) => {
      const targetElement = document.querySelector(targetSelector)
      if (!targetElement || !containerRef.current) return

      const targetRect = targetElement.getBoundingClientRect()

      // Convert viewport coordinates to section-relative coordinates
      const relativeX = mouseX - targetRect.left
      const relativeY = mouseY - targetRect.top

      const name = getUniqueRandomSvg()
      const img = document.createElement("img")
      img.src = `/logo-cluster/${name}`
      img.className = "falling-svg"

      const size = Math.min(Math.max(20 + speed * 0.3, 20), 60)
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
      const duration = Math.max(0.8, 2 - speed * 0.01)

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

      container.style.position = "absolute"
      container.style.left = `${rect.left + window.scrollX}px`
      container.style.top = `${rect.top + window.scrollY}px`
      container.style.width = `${rect.width}px`
      container.style.height = `${rect.height}px`
    }

    updateContainerPosition()

    // Update position on scroll and resize
    const handleUpdate = () => updateContainerPosition()
    window.addEventListener("scroll", handleUpdate)
    window.addEventListener("resize", handleUpdate)

    return () => {
      window.removeEventListener("scroll", handleUpdate)
      window.removeEventListener("resize", handleUpdate)
    }
  }, [targetSelector])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now()
      const { lastX, lastY, lastTime, frameCount } = mouseDataRef.current

      if (frameCount < 3) {
        mouseDataRef.current = {
          lastX: e.clientX,
          lastY: e.clientY,
          lastTime: currentTime,
          frameCount: frameCount + 1,
        }
        return
      }

      const timeDelta = Math.max(currentTime - lastTime, 1)
      const deltaX = e.clientX - lastX
      const deltaY = e.clientY - lastY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const speed = (distance / timeDelta) * 16.67

      const inTarget = isInTargetArea(e.clientX, e.clientY)

      if (debug) {
        setDebugInfo((prev) => ({ ...prev, speed: Math.round(speed), inTarget }))
      }

      if (inTarget && speed > speedThreshold) {
        if (mouseDataRef.current.frameCount % spawnRate === 0) {
          spawnSvg(e.clientX, e.clientY, speed)
        }
      }

      mouseDataRef.current = {
        lastX: e.clientX,
        lastY: e.clientY,
        lastTime: currentTime,
        frameCount: frameCount + 1,
      }
    }

    let rafId: number
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        handleMouseMove(e)
        rafId = 0
      })
    }

    window.addEventListener("mousemove", throttledMouseMove)
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [spawnSvg, isInTargetArea, speedThreshold, spawnRate, debug])

  return (
    <>
      <div ref={containerRef} className="pointer-events-none overflow-hidden" style={{ zIndex: 50 }} />
      {debug && (
        <div className="fixed top-4 right-4 bg-black text-white p-4 rounded z-[9999] font-mono text-sm">
          <div>Speed: {debugInfo.speed}</div>
          <div>In Target: {debugInfo.inTarget ? "✅" : "❌"}</div>
          <div>Threshold: {speedThreshold}</div>
          <div>Spawned: {debugInfo.spawned}</div>
          <div>Selector: {targetSelector}</div>
        </div>
      )}
    </>
  )
}
