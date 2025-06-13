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

const tiers = [
  {
    name: "Strategy 1" as const,
    slug: "starter",
    description: "You'll earn",
    priceMonthly: 1.8,
    href: "#",
    highlights: [
      { description: "Make the fun publicly available on Drift" },
      { description: "Everything you need to start" },
      { description: "RadiantAI integrations", disabled: true },
      { description: "Competitor analysis", disabled: true },
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
    name: "Strategy 2" as const,
    slug: "growth",
    description: "All the extras for your growing team.",
    priceMonthly: 3,
    href: "#",
    highlights: [
      { description: "Up to 10 team members" },
      { description: "Unlimited deal progress boards" },
      { description: "Source leads from over 50 verified platforms" },
      { description: "RadiantAI integrations" },
      { description: "5 competitor analyses per month" },
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
  },
  {
    name: "Strategy 3" as const,
    slug: "enterprise",
    description: "Added flexibility to close deals at scale.",
    priceMonthly: 6,
    href: "#",
    highlights: [
      { description: "Unlimited active team members" },
      { description: "Unlimited deal progress boards" },
      { description: "Source leads from over 100 verified platforms" },
      { description: "RadiantAI integrations" },
      { description: "Unlimited competitor analyses" },
    ],
    features: [
      { section: "Features", name: "Accounts", value: "Unlimited" },
      { section: "Features", name: "Deal progress boards", value: "Unlimited" },
      { section: "Features", name: "Sourcing platforms", value: "100+" },
      { section: "Features", name: "Contacts", value: "Unlimited" },
      { section: "Features", name: "AI assisted outreach", value: true },
      { section: "Analysis", name: "Competitor analysis", value: "Unlimited" },
      { section: "Analysis", name: "Dashboard reporting", value: true },
      { section: "Analysis", name: "Community insights", value: true },
      { section: "Analysis", name: "Performance analysis", value: true },
      { section: "Support", name: "Email support", value: true },
      { section: "Support", name: "24 / 7 call center support", value: true },
      { section: "Support", name: "Dedicated account manager", value: true },
    ],
  },
]

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Pricing that grows with your team size.</Heading>
      <Lead className="mt-6 max-w-3xl">
        Companies all over the world have closed millions of deals with Radiant. Sign up today and start selling
        smarter.
      </Lead>
    </Container>
  )
}

function PricingCards() {
  return (
    <div className="relative py-24">
      <Gradient className="absolute inset-x-2 bottom-0 top-48 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <div className="grid grid-rows-1 gap-8 lg:grid-rows-3">
          {tiers.map((tier, tierIndex) => (
            <PricingCard key={tierIndex} tier={tier} />
          ))}
        </div>
        <div className="p-16"></div>
        <StatsCard/>
        <LogoCloud className="mt-24" />
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
                  <p>return</p>
                  <p>per month</p>
                </div>
              </div>
              <div className="mt-8">
                <Button href={tier.href}>Start a free trial</Button>
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
              <ReturnChart
                monthlyReturnRate={tier.priceMonthly}
                title="Higher Return Comparison"
                description="Comparing 2.5% monthly returns against US Treasury yields"
                startDate={new Date(2024, 0, 1)}
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


import { clsx } from 'clsx'

export function FrequentlyAskedQuestions() {
  return (
    <Container>
      <section id="faqs" className="scroll-mt-8">
        <Subheading className="text-center">Frequently Asked Questions</Subheading>
        <Heading as="div" className="mt-2 text-center">
          Your questions answered.
        </Heading>
        <div className="mx-auto mb-32 mt-16 max-w-xl space-y-12">
          <dl className="space-y-8">
            <dt className="text-sm font-semibold">
              How safe is the DeFi Market-Neutral Hedge Fund in the vault?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              <strong>Your Assets Stay in Your Control:</strong> We built our JLP Navigator Vault on Drift’s secure Vault system, so you can verify everything on-chain.<br/>
              <strong>We Can Trade, Not Touch Your Funds:</strong> Our system only executes trades—it cannot withdraw or move your assets. You can exit anytime.<br/>
              <strong>Built on Proven Code:</strong> We haven’t altered Drift’s audited Vault code. Any unauthorized change would be publicly visible.
            </dd>

            <dt className="text-sm font-semibold">
              What are the smart contract risks associated with VIXII?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              <strong>Built on Proven Infrastructure:</strong> VIXII runs entirely on Drift’s audited smart contracts—no bespoke code here.<br/>
              <strong>Institutional-Grade Security:</strong> By leveraging Drift’s battle-tested framework, we inherit its transparent architecture and end-to-end integrity.
            </dd>

            <dt className="text-sm font-semibold">
              How does the vault generate returns?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              The Vault earns yield through multiple streams:
              <ul className="list-disc ml-5 mt-2">
                <li><strong>JLP Rewards:</strong> From providing liquidity to Jupiter pools.</li>
                <li><strong>Funding Rates:</strong> Hedging via Drift to capture funding-rate spreads.</li>
                <li><strong>Leverage:</strong> Optimized borrowing and hedging to boost returns without adding market exposure.</li>
              </ul>
            </dd>

            <dt className="text-sm font-semibold">
              Is this fund delta-neutral?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Yes—our Vault continuously hedges all positions to maintain delta-neutrality, so price moves in BTC, ETH, SOL, USDT, etc., have minimal PnL impact.
            </dd>

            <dt className="text-sm font-semibold">
              Is the trader’s PnL from Jupiter hedged?
            </dt>
            <dd className="mt-4 text-sm/6 text-gray-600">
              Absolutely. We rebalance in real time against long/short imbalances, so every trader’s PnL is fully hedged and the Vault remains delta-neutral.
            </dd>
          </dl>
        </div>
      </section>
    </Container>
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
      <Gradient />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <PricingCards />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl">
          <DefiFlowDiagram />
        </div>
      </div>
      {/* <PricingTable selectedTier={tier} /> */}
      <FrequentlyAskedQuestions />
      <Footer />
    </main>
  )
}