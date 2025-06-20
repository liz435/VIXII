import { AnimatedNumber } from '@/components/animated-number'
import { Container } from '@/components/container'
import { FeatureSectionG } from '@/components/feature-section-gallery'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { LogoCloud } from '@/components/logo-cloud'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import './global.css'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import SvgRain from '@/components/FallingObjects'
import { BentoSection } from '@/components/bentoSection'

export const metadata: Metadata = {
  description:
    'VIXII DeFi Hedge Fund Strategy for everyone, where your on-chain assests grow smarter',
}



export default function Home() {
  return (
    <SmoothScrollProvider>
      <Hero />
  
                           
      <main>
        <div className='mt-10'>
            <LogoCloud />
            </div>

        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
          <FeatureSectionG />

          <div className="overflow-hidden">
          <SvgRain 
            targetSelector=".sectionThatRains" 
            speedThreshold={2} 
            spawnRate={2}
            debug={false}
          />
            <Container className="select-none pb-24 sectionThatRains">
           
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
