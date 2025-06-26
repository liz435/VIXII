
import type React from "react"
import { Button } from "@/components/button"
import { Container } from "@/components/container"
import { Footer } from "@/components/footer"
import { Gradient } from "@/components/gradient"
import { LogoCloud } from "@/components/logo-cloud"
import { Navbar } from "@/components/navbar"
import { Heading, Lead, Subheading } from "@/components/text"
import { StatsCard } from "@/components/return-chart"
import DefiFlowDiagram from "@/components/defi-flow-diagram"
import ReturnChart from "@/components/pricing-chart"
import { FrequentlyAskedQuestions } from "@/components/FAQ"
import { JLPExplanationSection } from "@/components/text-section-product"
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import  Image  from "next/image"

const tiers = [
  {
    name: "Strategy USDC" as const,
    slug: "starter",
    description: "This strategy is perfect for investors who want reliable performance without getting caught in the ups and downs of crypto markets",
    priceMonthly: 7.4,
    days:'84',
    img:'/screenshots/usdc-vault.png',
    href: "https://app.drift.trade/vaults/strategy-vaults/mc1UFoEpaiyPVY4njGGerwLL7XzTVCQiwx6eUtuoDfR",
    highlights: [
      { description: "Make the fund publicly available on Drift" },
      { description: "USDC-based accounting" },
    ],
    features: [
      { section: "Features", name: "Accounts", value: 3 },
      { section: "Features", name: "Deal progress boards", value: 5 },
      { section: "Features", name: "Sourcing platforms", value: "Select" },
      { section: "Features", name: "Contacts", value: 100 },
      { section: "Features", name: "AI assisted outreach", value: false },
      { section: "Analysis", name: "Competitor analysis", value: false },
      { section: "Analysis", name: "Dashboard reporting", value: false },
      { section: "Analysis", name: "Community insights", value: false },
      { section: "Analysis", name: "Performance analysis", value: false },
      { section: "Support", name: "Email support", value: true },
      { section: "Support", name: "24 / 7 call center support", value: false },
      { section: "Support", name: "Dedicated account manager", value: false },
    ],
  },
  {
    name: "Strategy SOL" as const,
    slug: "growth",
    description: "All the extras for your growing team.",
    priceMonthly: 0.25,
    days:'7',
    img:'/screenshots/sol-vault.png',
    href: "https://app.drift.trade/vaults/strategy-vaults/AAMqcyowCHa9dH7ixvQXbcCMYfUmrpCiGNsCEqF6dwxG",
    highlights: [
      { description: "Make the fund publicly available on Drift" },
      { description: "SOL-based accounting" },
    ],
    features: [
      { section: "Features", name: "Accounts", value: 10 },
      { section: "Features", name: "Deal progress boards", value: "Unlimited" },
      { section: "Features", name: "Sourcing platforms", value: "100+" },
      { section: "Features", name: "Contacts", value: 1000 },
      { section: "Features", name: "AI assisted outreach", value: true },
      { section: "Analysis", name: "Competitor analysis", value: "5 / month" },
      { section: "Analysis", name: "Dashboard reporting", value: true },
      { section: "Analysis", name: "Community insights", value: true },
      { section: "Analysis", name: "Performance analysis", value: true },
      { section: "Support", name: "Email support", value: true },
      { section: "Support", name: "24 / 7 call center support", value: true },
      { section: "Support", name: "Dedicated account manager", value: false },
    ],
  }
  // {
  //   name: "Strategy 3" as const,
  //   slug: "enterprise",
  //   description: "Added flexibility to close deals at scale.",
  //   priceMonthly: 6,
  //   href: "#",
  //   highlights: [
  //     { description: "Unlimited active team members" },
  //     { description: "Unlimited deal progress boards" },
  //     { description: "Source leads from over 100 verified platforms" },
  //     { description: "RadiantAI integrations" },
  //     { description: "Unlimited competitor analyses" },
  //   ],
  //   features: [
  //     { section: "Features", name: "Accounts", value: "Unlimited" },
  //     { section: "Features", name: "Deal progress boards", value: "Unlimited" },
  //     { section: "Features", name: "Sourcing platforms", value: "100+" },
  //     { section: "Features", name: "Contacts", value: "Unlimited" },
  //     { section: "Features", name: "AI assisted outreach", value: true },
  //     { section: "Analysis", name: "Competitor analysis", value: "Unlimited" },
  //     { section: "Analysis", name: "Dashboard reporting", value: true },
  //     { section: "Analysis", name: "Community insights", value: true },
  //     { section: "Analysis", name: "Performance analysis", value: true },
  //     { section: "Support", name: "Email support", value: true },
  //     { section: "Support", name: "24 / 7 call center support", value: true },
  //     { section: "Support", name: "Dedicated account manager", value: true },
  //   ],
  // },
]

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">DeFi Market-Neutral Hedge Fund.</Heading>
      <Lead className="mt-6 max-w-3xl">
        Earn Stable Returns Without Market Guesswork.
      </Lead>

      <Lead className="mt-6 max-w-3xl text-[16px]">
        DeFi Market-Neutral Hedge Fund uses advanced algorithms to scan and capture arbitrage opportunities across decentralized exchanges. Designed to deliver steady, sustainable returns, it minimizes risk by remaining completely neutral to market direction and asset volatility.
      </Lead>
    </Container>
  )
}

function PricingCards() {
  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 bottom-0 top-48 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <div className="grid grid-rows-1 gap-8 lg:grid-rows-2">
          {tiers.map((tier, tierIndex) => (
            <div key={tierIndex} id={tierIndex === 1 ? "sol-vault" : undefined}>
              <PricingCard tier={tier} />
            </div>
          ))}
        </div>
        <div className="p-16"></div>
                  <Heading as="h2"> No bets. No speculation.</Heading>
                  <Heading as='h2'>Just smart, automated yield.</Heading>
        <div className="p-8"></div>
        <StatsCard/>

        <LogoCloud className="mt-16" />
      </Container>
    </div>
  )
}

function PricingCard({ tier }: { tier: (typeof tiers)[number] }) {
  return (
    <div className="-m-2 grid grid-cols-1 rounded-4xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
      <div className="grid grid-cols-1 rounded-4xl p-2 shadow-md shadow-black/5">
        <div className="rounded-3xl bg-white p-10 pb-9 shadow-2xl ring-1 ring-black/5">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Text Content */}
            <div className="flex-1">
              <Subheading>{tier.name}</Subheading>
              <p className="mt-2 text-xl/6 text-gray-950/75">{tier.description}</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="text-5xl font-medium text-gray-950">{tier.priceMonthly}%</div>
                <div className="text-sm/5 text-gray-950/75">
                  <p>APY</p>
                  <p>{tier.days} Days</p>
                </div>
              </div>
              <div className="mt-8">
                <Button href={tier.href}
                className="relative mt-3 mb-3 group overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] active:scale-95 active:translate-y-0"
                 >Start trading
                 </Button>
                
              </div>
              <div className="mt-8">
                <h3 className="text-sm/6 font-medium text-gray-950">Start earning now with:</h3>
                <ul className="mt-3 space-y-3">
                  {tier.highlights.map((props, featureIndex) => (
                    <FeatureItem key={featureIndex} {...props} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Graph */}
            <div className="flex-1">
              {/* <ReturnChart
                monthlyReturnRate={Math.round(tier.priceMonthly/3)}
                title="Higher Return Comparison"
                description="Comparing 2.5% monthly returns against US Treasury yields"
                startDate={new Date(2024, 0, 1)}
              /> */}


              <Image
                src={tier.img?? '/screenshots/usdc-vault.png'} // path must start with `/` if it's in public folder, e.g. "/images/vault.png"
                alt={tier.name || 'Vault image'}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-2xl"
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function FeatureItem({
  description,
  disabled = false,
}: {
  description: string
  disabled?: boolean
}) {
  return (
    <li
      data-disabled={disabled ? true : undefined}
      className="flex items-start gap-4 text-sm/6 text-gray-950/75 data-[disabled]:text-gray-950/25"
    >
      <span className="inline-flex h-6 items-center">
        <PlusIcon className="size-[0.9375rem] shrink-0 fill-gray-950/25" />
      </span>
      {disabled && <span className="sr-only">Not included:</span>}
      {description}
    </li>
  )
}

function PlusIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 15 15" aria-hidden="true" {...props}>
      <path clipRule="evenodd" d="M8 0H7v7H0v1h7v7h1V8h7V7H8V0z" />
    </svg>
  )
}





export default async function Pricing({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const tier =
    typeof resolvedSearchParams.tier === "string"
      ? tiers.find(({ slug }) => slug === resolvedSearchParams.tier)!
      : tiers[0]

  return (
    <main className="overflow-hidden">
      <SmoothScrollProvider>
      <Gradient />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <PricingCards />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl -mt-12">
          <DefiFlowDiagram />
        </div>
      </div>

        <JLPExplanationSection/>
      <FrequentlyAskedQuestions />
      <Footer />
      </SmoothScrollProvider>
    </main>
  )
}