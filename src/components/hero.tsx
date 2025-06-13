'use client'

import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Gradient } from '@/components/gradient'
import { Link } from '@/components/link'
import { Navbar } from '@/components/navbar'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import "../app/global.css"
import { Merriweather, DM_Sans } from "next/font/google"
import { motion } from "framer-motion"
import FallingObjects from "@/components/FallingObjects"



const merriweather = Merriweather({
  subsets: ["latin"],
  weight: [ "400",],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
      
  <Gradient className="absolute inset-0 rounded-4xl overflow-hidden">
      
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
        <div className="flex flex-col items-center justify-center text-center pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-32 md:pt-32">
      <h1
        className={`${merriweather.className} font-medium text-balance text-6xl/[0.9] tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-8xl/[1.2]`}
      >
        Where Your On-chain Assets Grow Smarter
      </h1>

      <p className={`${dmSans.className} mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8`}>
        Redefining how crypto assets grow—unlocking DeFi&apos;s potential for smarter, on-chain capital efficiency
      </p>

<div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
  <motion.div
    initial="hidden"
    animate="visible"
    variants={startButtonVariants}
  >
    <Button className="relative  group overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)] active:scale-95 active:translate-y-0">Get started</Button>
  </motion.div>


<motion.div
  initial="hidden"
  animate="visible"
  variants={strategyButtonVariants}
>
  <Button 
    variant="secondary" 
    className="transition-transform duration-300 ease-out hover:scale-110 group"
  >
    {/* Text counter-scales to stay same size */}
    <span className="transition-transform duration-300 ease-out group-hover:scale-90 origin-center">
      View Strategies
    </span>
  </Button>
</motion.div>
<FallingObjects/>
</div>
    </div>
      </Container>
      </Gradient>
    </div>
  )
}