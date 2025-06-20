"use client"

import ReactMarkdown from "react-markdown"
import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { Container } from "@/components/container"
import { Heading, Lead } from "@/components/text"

export function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqs = [
    {
      question: "How safe is the DeFi Market-Neutral Hedge Fund in Vault?",
      answer: `**You're always in control.**  
Your funds never leave your wallet or custody. Our strategy runs on top of Drift's Vault system — a secure and transparent platform trusted by many in the DeFi space.

**We only trade, not touch.**  
Our strategy only places trades using your deposited funds — it can't withdraw, move, or misuse your assets. You're free to exit and withdraw anytime.

**It runs on trusted, public code.**  
We didn't write our own smart contracts from scratch. We use Drift's original, battle-tested code, with no modifications. All changes are visible on Drift's public dashboard.`,
    },
    {
      question: "What are the smart contract risks associated with VIXII?",
      answer: `**We don't reinvent the wheel — we build on what's already proven.**  
VIXII doesn't use its own custom contracts. Instead, we run entirely on Drift's audited and widely used smart contract system.

**Why that matters:**  
Smart contract bugs are one of the biggest risks in DeFi. By leveraging well-established infrastructure, we avoid pitfalls of untested or experimental code.

All trading happens inside Drift's ecosystem, ensuring the same level of security and transparency trusted by institutional users.`,
    },
    {
      question: "How does the Vault generate returns?",
      answer: `The Vault earns yield from **multiple sources** working together:
- **JLP Rewards**: By providing liquidity to Jupiter DEX, we earn fees and token rewards.
- **Funding Rates**: Hedging on Drift allows us to earn yield from funding rate differences.
- **Smart Leverage**: We apply safe, optimized borrowing and hedging, boosting returns without extra market risk.`,
    },
    {
      question: "Is this fund delta-neutral?",
      answer: `**Yes — it's fully delta-neutral.**  
The strategy is designed to cancel out market movements. Whether crypto prices rise or fall, your returns stay stable.

We hedge assets like BTC, ETH, SOL, and USDT to ensure that **price swings don't affect your earnings**.`,
    },
    {
      question: "Is the trader's PnL from Jupiter hedged?",
      answer: `**Yes, it's fully hedged.**  
The Vault monitors trader positions — long or short — and continuously rebalances to stay neutral.

This means your exposure remains balanced, avoiding gains or losses from market direction.`,
    },
  ]

  return (
    <div className="relative py-24">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-gray-950/60 uppercase tracking-wide">Frequently asked questions</p>
            <Heading as="h2" className="mt-4 text-gray-950">
              Your questions answered.
            </Heading>
            <Lead className="mt-6 text-gray-950/75">
              Get clarity on security, returns, and how our market-neutral strategy protects your investments.
            </Lead>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-200 hover:shadow-md">
                  <button
                    className="flex w-full items-center justify-between p-6 text-left transition-colors duration-200 hover:bg-gray-50/50"
                    onClick={() => toggleIndex(index)}
                  >
                    <span className="text-lg font-medium text-gray-950 pr-4">{faq.question}</span>
                    <div className="flex-shrink-0">
                      <ChevronDownIcon
                        className={`h-5 w-5 text-gray-950/50 transform transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-950/10 pt-4">
                        <div className="prose prose-sm max-w-none text-gray-950/75 leading-relaxed [&_strong]:text-gray-950 [&_strong]:font-semibold [&_ul]:mt-3 [&_li]:mt-1">
                          <ReactMarkdown>{faq.answer}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100/50 p-8 ring-1 ring-black/5">
              <Heading as="h3" className="text-gray-950 text-xl">
                Still have questions?
              </Heading>
              <p className="mt-3 text-gray-950/75">
                Our team is here to help you understand how our market-neutral strategy can fit into your investment
                portfolio.
              </p>
              <div className="mt-6">
                <button className="relative group overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] active:scale-95 active:translate-y-0 inline-flex items-center rounded-full bg-gray-950 px-6 py-3 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2">
                  <a href="mailto:zl3652@columbia.edu">
                  Contact our team
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
