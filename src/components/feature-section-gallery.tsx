'use client'

import { Container } from '@/components/container'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

// Sample screenshots data - replace with your actual images
const screenshots = [
  {
    id: 1,
    src: '/screenshots/app.png',
    alt: 'Main dashboard view',
    title: 'Complete Sales Pipeline Overview',
  },
  {
    id: 2,
    src: '/screenshots/competitors.png',
    alt: 'Analytics dashboard',
    title: 'Advanced Analytics & Insights',
  },
  {
    id: 3,
    src: '/screenshots/profile.png',
    alt: 'Deal management interface',
    title: 'Deal Management Made Simple',
  },
  {
    id: 4,
    src: '/screenshots/networking.png',
    alt: 'Reporting interface',
    title: 'Comprehensive Reporting Tools',
  },
]

function Screenshot({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
      <div className="relative rounded-2xl p-2  h-full">
        <div className="relative w-full h-full overflow-hidden rounded-4xl">
          <Image
            src={src || '/placeholder.svg'}
            alt={alt}
            fill
            className="object-contain rounded-3xl shadow-2xl ring-1 ring-black/5 rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 76rem, 76rem"
            priority={true}
          />
        </div>
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
    <div className="mt-8 flex items-center justify-center gap-4">
      <button
        onClick={onPrevious}
        className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-black/20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-black" />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalImages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-black'
                : 'bg-black/30 hover:bg-black/50'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="flex h-12 w-12 items-center justify-center rounded-full transition-colors hover:bg-black/20"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-black" />
      </button>
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
      setCurrentIndex((prevIndex) =>
        prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1,
      )
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [isHovered])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1,
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="overflow-hidden bg-white">
      <Container className="pb-24 pt-16">
        <div className="">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mt-16"
          >
            {/* Fixed size container to prevent layout shift */}
            <div className="mx-auto w-full max-w-[76rem] h-[36rem] sm:h-[48rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Screenshot
                    src={currentScreenshot.src}
                    alt={currentScreenshot.alt}
                    className="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Title with fixed height to prevent layout shift */}
            <div className="mt-6 h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-center text-xl font-semibold text-black">
                    {currentScreenshot.title}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

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