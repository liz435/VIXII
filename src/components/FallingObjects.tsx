'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const svgNames = ['bitcoin-btc-logo.svg', 'ethereum-eth-logo.svg', 'jupiter-ag-jup-logo.svg', 'solana-sol-logo.svg', 'tether-usdt-logo.svg', 'usd-coin-usdc-logo.svg'] // 放在 /public/logo-cluster/


let remainingSvgs = [...svgNames]

function getUniqueRandomSvg() {
  if (remainingSvgs.length === 0) {
    remainingSvgs = [...svgNames] // 重置
  }
  const index = Math.floor(Math.random() * remainingSvgs.length)
  const name = remainingSvgs[index]
  remainingSvgs.splice(index, 1) // 移除已用
  return name
}


export default function SvgRain() {
  const containerRef = useRef<HTMLDivElement>(null)

  const spawnSvg = (x: number, y: number) => {
    const name = getUniqueRandomSvg()
    const img = document.createElement('img')
    img.src = `/logo-cluster/${name}`
    img.className = 'falling-svg'
    img.style.left = `${x}px`
    img.style.top = `${y}px`
    containerRef.current?.appendChild(img)

    gsap.to(img, {
      y: window.innerHeight - y - 60,
      duration: 1.2,
      ease: 'bounce.out',
      onComplete: () => {
        gsap.to(img, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => img.remove(),
        })
      },
    })
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      spawnSvg(e.clientX, e.clientY)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
    />
  )
}
