import { AnimatedNumber } from '@/components/animated-number'
import { BentoCard } from '@/components/bento-card'
import { Container } from '@/components/container'
import { FeatureSectionG } from '@/components/feature-section-gallery'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Keyboard } from '@/components/keyboard'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { Map } from '@/components/map'
import LightThemedChart from '@/components/return-chart'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import './global.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import FallingObjects from '@/components/FallingObjects'

export const metadata: Metadata = {
  description:
    'VIXII DeFi Hedge Fund Strategy for everyone, where your on-chain assests grow smarter',
}

function BentoSection() {
  return (
    <Container>
      <Subheading>Strategy -know more about how your capital grow</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Know more about what your capital can do.
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
        <BentoCard
          eyebrow="Alpha"
          title="Automated Alpha, Engineered for DeFi"
          description="Constructing alpha-driven strategies by capturing all arbitrage opportunities and applying robust hedging—across DEXs, CEXs, and multi-asset markets—for sustainable returns"
          graphic={
            <div className="absolute inset-0 bg-[url(/screenshots/competitors.png)] bg-[size:1100px_650px] bg-[left_-38px_top_-73px] bg-no-repeat" />
          }
          fade={['bottom']}
          className="lg:col-span-3 lg:rounded-tr-4xl"
        />

        <BentoCard
          eyebrow="Beta"
          title="Managed Beta, Designed for Resilience"
          description="We develop timing strategies based on price and volume trends of major crypto assets, enhanced by tight position control—to outperform the market with fully automated trading and risk management."
          graphic={
            <div className="h-80 bg-[url(/screenshots/profile.png)] bg-[size:1000px_560px] bg-[left_-109px_top_-112px] bg-no-repeat" />
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
    </Container>
  )
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Hero />
                                      <FallingObjects/>

      <main>
        <div className='mt-10'>
            <LogoCloud />
            </div>

        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSectionG />

          <div className="overflow-hidden">
            <Container className="select-none pb-24">
              <Heading as="h2" className="max-w-3xl">
                A Showcase of the number.
              </Heading>


              <div className="mt-16">
                <div className="max-lg:mt-16 lg:col-span-1">
                  <Subheading>The Numbers</Subheading>
                  <hr className="mt-6 border-t border-gray-200" />
                  <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                      <dt className="text-sm/6 text-gray-600">
                        Asset Under Management
                      </dt>
                      <dd className="order-first text-6xl font-medium tracking-tight">
                        $<AnimatedNumber start={100} end={322} />M
                      </dd>
                    </div>
                    <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                      <dt className="text-sm/6 text-gray-600">APY</dt>
                      <dd className="order-first text-6xl font-medium tracking-tight">
                        <AnimatedNumber start={15} end={40} />%
                      </dd>
                    </div>
                    <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
                      <dt className="text-sm/6 text-gray-600">Team Members</dt>
                      <dd className="order-first text-6xl font-medium tracking-tight">
                        <AnimatedNumber start={11} end={55} />
                      </dd>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <dt className="text-sm/6 text-gray-600">Master Degree</dt>
                      <dd className="order-first text-6xl font-medium tracking-tight">
                        <AnimatedNumber start={0} end={100} />%
                      </dd>
                    </div>
                  </dl>

                </div>
              </div>
            </Container>
          </div>
          <BentoSection />
        </div>
      </main>

      <Testimonials />
      <Footer />
    </SmoothScrollProvider>
  )
}
