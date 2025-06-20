'use client'

import { BentoCard } from '@/components/bento-card'
import { Container } from '@/components/container'
import { Heading, Subheading } from '@/components/text'
import { Suspense } from 'react'
import { LogoCluster } from '@/components/logo-cluster'
import { Map } from '@/components/map'
import LightThemedChart from '@/components/return-chart'
import { Keyboard } from '@/components/keyboard'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

export function BentoSection() {
  return (
    <Container>
      <section data-section="bento">
      <Subheading>Strategy -know more about how your capital grow</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Know more about what your capital can do.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
        <BentoCard
          eyebrow={ <HoverDefinition term="Alpha" definition="In finance, 'alpha' measures an investment's performance relative to a benchmark index." />}
          title={
            <>
            Automated Alpha, Sustainable Returns
            </>
          }
          description="Constructing alpha-driven strategies by capturing all arbitrage opportunities and applying robust hedging—across DEXs, CEXs, and multi-asset markets—for sustainable returns"
            graphic={
                <div className="absolute inset-0 bg-[url(/screenshots/alpha.png)] bg-cover bg-center bg-no-repeat" />
            }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />

        <BentoCard
          eyebrow={<HoverDefinition term="Beta" definition="In finance, 'beta' measures how much an investment's price moves relative to the overall market." />}
          title="Managed Beta, Designed for Resilience"
          description="We develop timing strategies based on price and volume trends of major crypto assets, enhanced by tight position control—to outperform the market with fully automated trading and risk management."
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/beta.png)] bg-cover bg-center bg-no-repeat" />
          }
          fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-3 lg:rounded-tl-4xl"
        />
      </div>

      <Subheading className="mt-16">Performance</Subheading>
      <Heading as="h3" className="mb-12 mt-2 max-w-3xl">
        Discover Your Potential Returns.
      </Heading>

      <Suspense>
        <LightThemedChart />
      </Suspense>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-1">
        <BentoCard
          eyebrow="Limitless"
          title="Actively Managed Trend Following Strategy"
          description="100% USDT-denominated return in 2024, with a maximum drawdown of 30%."
          graphic={
            <div className="flex size-full pl-10 pt-10">
              <Keyboard highlighted={['U', 'S', 'D', 'T']} />
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Confidence"
          title="Hedging and Arbitrage Strategy Based on JLP"
          description="40% USDT-denominated return in 2024, with a maximum drawdown of 1%"
          graphic={<LogoCluster />}
          className="lg:col-span-2"
        />
        <BentoCard
          eyebrow="remote"
          title="Globally"
          description="VIXII can bring you steady return no matter where you are."
          graphic={<Map />}
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
      </section>
    </Container>
  )
}

export function HoverDefinition({ term, definition }: { term: string; definition: string }) {
  const [hovered, setHovered] = useState(false)

  return (
    <span
      className="relative cursor-help border-b border-dotted border-white/60 hover:border-white transition"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {term}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: -8 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-10 w-64 -translate-x-1/2 rounded-md bg-zinc-900 p-3 text-xs text-white shadow-lg"
          >
            {definition}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}