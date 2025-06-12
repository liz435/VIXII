"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Container } from "@/components/container"
import { Heading } from "@/components/text"

// Sample screenshots data - replace with your actual images
const screenshots = [
  {
    id: 1,
    src: "/screenshots/app.png",
    alt: "Main dashboard view",
    title: "Complete Sales Pipeline Overview",
  },
  {
    id: 2,
    src: "/screenshots/competitors.png",
    alt: "Analytics dashboard",
    title: "Advanced Analytics & Insights",
  },
  {
    id: 3,
    src: "/screenshots/profile.png",
    alt: "Deal management interface",
    title: "Deal Management Made Simple",
  },
  {
    id: 4,
    src: "/screenshots/networking.png",
    alt: "Reporting interface",
    title: "Comprehensive Reporting Tools",
  },
]

function Screenshot({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
      <div className="relative rounded-2xl bg-[#0B1426] p-2 ring-1 ring-black/10 backdrop-blur">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="rounded-lg shadow-2xl ring-1 ring-black/5"
        />
      </div>
    </div>
  )
}

function GalleryControls({
  currentIndex,
  totalImages,
  onPrevious,
  onNext,
  onGoToIndex,
}: {
  currentIndex: number
  totalImages: number
  onPrevious: () => void
  onNext: () => void
  onGoToIndex: (index: number) => void
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">


      <div className="flex gap-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-black" : "bg-black/30 hover:bg-black/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>


    </div>
  )
}

export function FeatureSectionG() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const currentScreenshot = screenshots[currentIndex]

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovered) return // Don't auto-scroll when user is hovering

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1))
    }, 3000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [isHovered])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1))
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="overflow-hidden bg-white">
      <Container className="pb-24 pt-16">
        <div className="text-center">
          <Heading as="h2" className="max-w-3xl mx-auto text-black">
            A snapshot of your entire sales pipeline.
          </Heading>

          <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="mt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Screenshot
                  width={1216}
                  height={768}
                  src={currentScreenshot.src}
                  alt={currentScreenshot.alt}
                  className="h-[36rem] sm:h-auto sm:w-[76rem] mx-auto"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6"
                >
                  <h3 className="text-xl font-semibold text-black">{currentScreenshot.title}</h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <GalleryControls
              currentIndex={currentIndex}
              totalImages={screenshots.length}
              onPrevious={goToPrevious}
              onNext={goToNext}
              onGoToIndex={goToIndex}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}
