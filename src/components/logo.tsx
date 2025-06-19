'use client'
import { useRef } from "react"
import { gsap } from "gsap" // Add this import

export function Logo() {
  const logoRef = useRef<HTMLImageElement>(null)

  const handleClick = () => {
    const tl = gsap.timeline()

    tl.to(logoRef.current, {
      rotation: 360,
      scale: 0.5,
      duration: 0.4,
      ease: 'power2.inOut',
    }).to(logoRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    })
  }

  return (
    <span className="flex items-center gap-2 cursor-pointer" onClick={handleClick}>
      <img
        ref={logoRef}
        alt="VIXII"
        src="/logo/VIXII.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
      />
      <h1 className="text-3xl">VIXII</h1>
    </span>
  )
}

export function Mark({ className }: { className?: string }) {

    const logoRef = useRef<HTMLImageElement>(null)

  const handleClick = () => {
    const tl = gsap.timeline()

    tl.to(logoRef.current, {
      rotation: 360,
      scale: 0.5,
      duration: 0.4,
      ease: 'power2.inOut',
    }).to(logoRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.inOut',
    })
  }
  return (
    <span onClick={handleClick}>
    <img
        ref={logoRef}
        alt="VIXII"
        src="/logo/VIXII.svg"
        className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
      />
      </span>
  )
}
