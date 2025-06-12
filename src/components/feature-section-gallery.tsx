"use client"

import { useState } from "react"
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
}: {
  currentIndex: number
  totalImages: number
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={onPrevious}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-black/10 backdrop-blur-sm border border-black/20 hover:bg-black/20 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              /* We'll handle this in the parent component */
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-black" : "bg-black/30 hover:bg-black/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-black/10 backdrop-blur-sm border border-black/20 hover:bg-black/20 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </div>
  )
}

export function FeatureSectionG() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentScreenshot = screenshots[currentIndex]

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
    <div className="overflow-hidden  bg-white">
      <Container className="pb-24 pt-16">
        <div className="text-center">
          <Heading as="h2" className="max-w-3xl mx-auto text-black">
            A snapshot of your entire sales pipeline.
          </Heading>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-16"
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
          />
        </div>
      </Container>
    </div>
  )
}
