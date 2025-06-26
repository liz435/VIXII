'use client'

import * as Headless from '@headlessui/react'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react'
import useMeasure, { type RectReadOnly } from 'react-use-measure'
import { Container } from './container'
import { Link } from './link'
import { Heading, Subheading } from './text'

export const testimonials = [
  {
    img: '/testimonials//tina-yards.jpg',
    name: 'Crypto Whale 07',
    title: 'Individual Investor',
    quote:
      "For the first time, I've experienced institutional-grade trading and security as an individual investor. VIXII's strategies consistently deliver stable performance and have become a cornerstone of my long-term investment allocation.",
  },
  {
    img: '/testimonials/conor-neville.jpg',
    name: 'Sophia P.',
    title: 'Business Development Team, Binance Exchange',
    quote:
      "VIXII's team demonstrates exceptional understanding of on-chain trading mechanics. Their strategy execution is both precise and efficient, making them our trusted quantitative partner in the DeFi ecosystem.",
  },
  {
    img: '/testimonials/amy-chase.jpg',
    name: 'Nova DAO Treasury',
    title: 'DAO Treasury Representative',
    quote:
      "Our DAO treasury has achieved consistent returns through VIXII's platform. The transparency and built-in risk management features are exceptional—perfectly suited for sustainable decentralized fund growth.",
  },
  {
    img: '/testimonials/veronica-winton.jpg',
    name: 'Ryan Cheng',
    title: 'Manufacturing Industry Founder',
    quote:
      "VIXII transformed my transition from traditional finance to Web3. This platform made sophisticated on-chain strategies both accessible and reliable, significantly enhancing our capital efficiency.",
  },
  {
    img: '/testimonials/veronica-winton.jpg',
    name: 'J. Zhang',
    title: 'Fund Manager, SL Investment',
    quote:
      "VIXII's strategies are methodically rigorous and perform exceptionally well across all market conditions. We've integrated their solutions as a core source of low-correlation alpha in our diversified portfolio.",
  },
];

function TestimonialCard({
  name,
  title,
  img,
  children,
  bounds,
  scrollX,
  ...props
}: {
  img: string
  name: string
  title: string
  children: React.ReactNode
  bounds: RectReadOnly
  scrollX: MotionValue<number>
} & HTMLMotionProps<'div'>) {
  let ref = useRef<HTMLDivElement | null>(null)

  let computeOpacity = useCallback(() => {
    let element = ref.current
    if (!element || bounds.width === 0) return 1

    let rect = element.getBoundingClientRect()

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
<motion.div
  ref={ref}
  style={{ opacity }}
  {...props}
  className="relative flex aspect-[9/16] w-72 shrink-0 snap-start scroll-ml-[var(--scroll-padding)] flex-col justify-between overflow-hidden rounded-3xl bg-gray-900/80 backdrop-blur-md shadow-xl ring-1 ring-inset ring-white/10 sm:aspect-[3/4] sm:w-96 transition-all"
>
  {/* Overlay */}
  <div
    aria-hidden="true"
    className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/50 to-transparent"
  />

  <figure className="relative z-10 flex h-full flex-col justify-between p-20">
    {/* Quote */}
    <blockquote className="flex-1">
      <p className="relative text-base text-white leading-relaxed">
        <span
          aria-hidden="true"
          className="absolute left-[-0.6em] top-[-0.3em] text-4xl text-white/40 leading-none"
        >
          “
        </span>
        <span className="block">{children}</span>
        <span
          aria-hidden="true"
          className="absolute bottom-[-0.3em] right-[-0.6em] text-4xl text-white/40 leading-none"
        >
          ”
        </span>
      </p>
    </blockquote>

    {/* Footer */}
    <figcaption className="mt-8 border-t border-white/20 pt-4">
      <p className="text-sm font-semibold text-white">{name}</p>
      <p className="text-sm font-medium text-white/70 mt-0.5">
        <span className="bg-gradient-to-r from-[#fff1be] via-[#ee87cb] to-[#b060ff] bg-clip-text text-transparent">
          {title}
        </span>
      </p>
    </figcaption>
  </figure>
</motion.div>


  )
}

function CallToAction() {
  return (
    <div>

      <div className="mt-2">
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
        >
          Get started
          <ArrowLongRightIcon className="size-5" />
        </Link>
      </div>
    </div>
  )
}

export function Testimonials() {
  let scrollRef = useRef<HTMLDivElement | null>(null)
  let { scrollX } = useScroll({ container: scrollRef })
  let [setReferenceWindowRef, bounds] = useMeasure()
  let [activeIndex, setActiveIndex] = useState(0)
  let [isUserInteracting, setIsUserInteracting] = useState(false)
  let autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Double the testimonials array for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  useMotionValueEvent(scrollX, 'change', (x) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0].clientWidth
      const currentIndex = Math.floor(x / cardWidth)
      setActiveIndex(currentIndex % testimonials.length)
    }
  })

  function scrollTo(index: number) {
    if (scrollRef.current) {
      let gap = 32
      let width = (scrollRef.current.children[0] as HTMLElement).offsetWidth
      scrollRef.current.scrollTo({ left: (width + gap) * index, behavior: 'smooth' })
    }
  }

  // Auto scroll function
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (!isUserInteracting && scrollRef.current) {
        const gap = 32
        const cardWidth = (scrollRef.current.children[0] as HTMLElement).offsetWidth
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        const currentScroll = scrollRef.current.scrollLeft
        const nextScroll = currentScroll + cardWidth + gap

        if (nextScroll >= maxScroll) {
          // Reset to beginning for infinite scroll
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          scrollRef.current.scrollTo({ left: nextScroll, behavior: 'smooth' })
        }
      }
    }, 2000) // Change slide every 3 seconds
  }, [isUserInteracting])

  // Handle user interaction
  const handleMouseEnter = () => {
    setIsUserInteracting(true)
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsUserInteracting(false)
    startAutoScroll()
  }

  // Initialize auto scroll
  useEffect(() => {
    startAutoScroll()
    
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [startAutoScroll])

  // Handle scroll reset for infinite effect
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current && !isUserInteracting) {
        const scrollContainer = scrollRef.current
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const currentScroll = scrollContainer.scrollLeft
        const cardWidth = (scrollContainer.children[0] as HTMLElement).offsetWidth
        const gap = 32
        const singleSetWidth = (cardWidth + gap) * testimonials.length

        // If we've scrolled past the first set, reset to the equivalent position in the first set
        if (currentScroll >= singleSetWidth) {
          const equivalentPosition = currentScroll - singleSetWidth
          scrollContainer.scrollTo({ left: equivalentPosition })
        }
      }
    }

    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [isUserInteracting])

  return (
    <div className="overflow-hidden py-32">
      <Container>
        <div ref={setReferenceWindowRef}>
          <Subheading>Our wonderful team</Subheading>
          <Heading as="h3" className="mt-2">
            Trusted By Professionals
          </Heading>
        </div>
      </Container>
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={clsx([
          'mt-16 flex gap-8 px-[var(--scroll-padding)]',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(theme(spacing.6),calc((100vw-theme(maxWidth.2xl))/2))] lg:[--scroll-padding:max(theme(spacing.8),calc((100vw-theme(maxWidth.7xl))/2))]',
        ])}
      >
        {duplicatedTestimonials.map(({ img, name, title, quote }, testimonialIndex) => (
          <TestimonialCard
            key={`${testimonialIndex}-${testimonialIndex >= testimonials.length ? 'duplicate' : 'original'}`}
            name={name}
            title={title}
            img={img}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => scrollTo(testimonialIndex % testimonials.length)}
          >
            {quote}
          </TestimonialCard>
        ))}
        <div className="w-[42rem] shrink-0 sm:w-[54rem]" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-between">
          <CallToAction />
          <div className="hidden sm:flex sm:gap-2">
            {testimonials.map(({ name }, testimonialIndex) => (
              <Headless.Button
                key={testimonialIndex}
                onClick={() => scrollTo(testimonialIndex)}
                data-active={
                  activeIndex === testimonialIndex ? true : undefined
                }
                aria-label={`Scroll to testimonial from ${name}`}
                className={clsx(
                  'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                  'data-[active]:bg-gray-400 data-[hover]:bg-gray-400',
                  'forced-colors:data-[active]:bg-[Highlight] forced-colors:data-[focus]:outline-offset-4',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}