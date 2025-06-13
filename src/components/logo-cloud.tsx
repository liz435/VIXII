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

export function LogoCloud({ className }: React.ComponentPropsWithoutRef<"div">) {
  // Duplicate logos multiple times to ensure continuous scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos]
  const [isLoaded, setIsLoaded] = useState(false)

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true)
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
          animation-duration: 30s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: ${isLoaded ? "running" : "paused"};
          opacity: ${isLoaded ? 1 : 0};
          transition: opacity 0.5s ease;
        }

        .forward {
          animation-name: scrollForward;
        }

        .backward {
          animation-name: scrollBackward;
        }

        @keyframes scrollForward {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollBackward {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
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
        }
      `}</style>

      {/* Row 1 - Left to Right */}
      <div className="marquee mb-10">
        <div className="marquee-content forward">
          {duplicatedLogos.map((logo, i) => (
            <div key={`row1-${i}`} className="logo-item">
              <Image
                alt={logo.alt}
                src={logo.src || "/placeholder.svg"}
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
                unoptimized
                priority={i < 8} // Prioritize loading the first set of logos
              />
            </div>
          ))}
          {duplicatedLogos.map((logo, i) => (
            <div key={`row1-dup-${i}`} className="logo-item">
              <Image
                alt={logo.alt}
                src={logo.src || "/placeholder.svg"}
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right to Left */}
      <div className="marquee mt-10">
        <div className="marquee-content backward">
          {duplicatedLogos.map((logo, i) => (
            <div key={`row2-${i}`} className="logo-item">
              <Image
                alt={logo.alt}
                src={logo.src || "/placeholder.svg"}
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
                unoptimized
                priority={i < 8} // Prioritize loading the first set of logos
              />
            </div>
          ))}
          {duplicatedLogos.map((logo, i) => (
            <div key={`row2-dup-${i}`} className="logo-item">
              <Image
                alt={logo.alt}
                src={logo.src || "/placeholder.svg"}
                width={120}
                height={48}
                className="h-9 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
