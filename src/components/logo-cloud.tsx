"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { clsx } from "clsx"
import Image from "next/image"

const logos = [
  { alt: "jupiter", src: "/logo-cloud/jupiter.svg" },
  { alt: "solana", src: "/logo-cluster/solana-sol-logo.svg" },
  { alt: "drift", src: "/logo-cloud/drift2.png" },
  { alt: "btc", src: "/logo-cluster/bitcoin-btc-logo.svg" },
  { alt: "jup", src: "/logo-cluster/jupiter-ag-jup-logo.svg" },
  { alt: "eth", src: "/logo-cluster/ethereum-eth-logo.svg" },
  { alt: "usdc", src: "/logo-cluster/usd-coin-usdc-logo.svg" },
  { alt: "usdt", src: "/logo-cluster/tether-usdt-logo.svg" },
]

// Shuffle function to randomize logo order
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function LogoCloud({ className }: React.ComponentPropsWithoutRef<"div">) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [row1Logos, setRow1Logos] = useState<typeof logos>([])
  const [row2Logos, setRow2Logos] = useState<typeof logos>([])

  // Initialize with randomized logos after component mounts
  useEffect(() => {
    const shuffled1 = shuffleArray(logos)
    const shuffled2 = shuffleArray(logos)

    // Create multiple duplicates for seamless scrolling
    setRow1Logos([...shuffled1, ...shuffled1, ...shuffled1, ...shuffled1])
    setRow2Logos([...shuffled2, ...shuffled2, ...shuffled2, ...shuffled2])

    // Small delay to ensure smooth start
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={clsx(className, "relative overflow-hidden w-full")}>
      <style jsx>{`
        .marquee {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }

        .marquee-content {
          display: flex;
          animation-duration: 40s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: ${isLoaded ? "running" : "paused"};
          opacity: ${isLoaded ? 1 : 0};
          transition: opacity 0.3s ease;
        }

        .forward {
          animation-name: scrollForward;
          transform: translateX(-25%); /* Start from middle position */
        }

        .backward {
          animation-name: scrollBackward;
          transform: translateX(-25%); /* Start from middle position */
        }

        @keyframes scrollForward {
          from {
            transform: translateX(-25%);
          }
          to {
            transform: translateX(-75%);
          }
        }

        @keyframes scrollBackward {
          from {
            transform: translateX(-75%);
          }
          to {
            transform: translateX(-25%);
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        .logo-item {
          flex-shrink: 0;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }

        /* Ensure smooth loading */
        .marquee-content:not(.loaded) {
          transform: translateX(-25%);
        }
      `}</style>

      {/* Row 1 - Left to Right */}
      <div className="marquee mb-10">
        <div className={`marquee-content forward ${isLoaded ? "loaded" : ""}`}>
          {row1Logos.map((logo, i) => (
            <div key={`row1-${i}`} className="logo-item">
              <Image
                alt={logo.alt}
                src={logo.src || "/placeholder.svg"}
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
                unoptimized
                priority={i < 8}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="marquee mt-10">
        <div className={`marquee-content backward ${isLoaded ? "loaded" : ""}`}>
          {row2Logos.map((logo, i) => (
            <div key={`row2-${i}`} className="logo-item">
              <Image
                alt={logo.alt}
                src={logo.src || "/placeholder.svg"}
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
                unoptimized
                priority={i < 8}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
