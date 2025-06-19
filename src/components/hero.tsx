'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'

import { Gradient } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { motion } from 'framer-motion'
import { DM_Sans, Merriweather } from 'next/font/google'
import '../app/global.css'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const startButtonVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

const strategyButtonVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
}

export function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-0 overflow-hidden rounded-4xl">
        <Container className="relative">
          <Navbar
            banner={
              <Link
                href="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
                className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30"
              >
                Assets Under Management (AUM) reached RMB 3.8 billion
                <ChevronRightIcon className="size-4" />
              </Link>
            }
          />
          <div className="flex flex-col items-center justify-center pb-24 pt-16 text-center sm:pb-32 sm:pt-24 md:pb-32 md:pt-32">
            <h1
              className={`${merriweather.className} select-none text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-8xl/[1.2]`}
            >
              Where Your On-chain Assets Grow Smarter
            </h1>

            <p
              className={`${dmSans.className} mt-8 max-w-lg select-none text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8`}
            >
              Redefining how crypto assets grow—unlocking DeFi&apos;s potential
              for smarter, on-chain capital efficiency
            </p>

            <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={startButtonVariants}
              >
                <Button className="group relative transform overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)] active:translate-y-0 active:scale-95">
                  Get started
                </Button>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={strategyButtonVariants}
              >
                <Button
                  variant="secondary"
                  className="group transition-transform duration-300 ease-out hover:scale-110"
                >
                  {/* Text counter-scales to stay same size */}
                  <span className="origin-center transition-transform duration-300 ease-out group-hover:scale-90">
                    View Strategies
                  </span>
                </Button>
              </motion.div>
        
            </div>
          </div>
        </Container>
      </Gradient>
    </div>
  )
}
