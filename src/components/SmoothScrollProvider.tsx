"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

      // Store the callback reference so we can remove it later
      const refreshInitCallback = () => {
        // Force a small delay to ensure all layout calculations are complete
        setTimeout(() => ScrollTrigger.refresh(), 100)
      }

      // Make sure ScrollTrigger refreshes on window resize
      ScrollTrigger.addEventListener("refreshInit", refreshInitCallback)

      // Create the smooth scroller
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.2, // Adjust smoothness (higher = slower)
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      })

      // Refresh ScrollTrigger to ensure everything is properly initialized
      ScrollTrigger.refresh()

      return () => {
        smoother.kill()
        ScrollTrigger.clearScrollMemory()
        ScrollTrigger.removeEventListener("refreshInit", refreshInitCallback)
      }
    }
  }, [])

  return (
    <>
      <div id="smooth-wrapper" ref={wrapperRef} className="smooth-wrapper">
        <div id="smooth-content" ref={contentRef} className="smooth-content">
          {children}
        </div>
      </div>
    </>
  )
}
