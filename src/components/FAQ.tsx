'use client'

import ReactMarkdown from 'react-markdown'
import { useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
export  function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  
  
 const faqs = [
  {
    question: 'How safe is the DeFi Market-Neutral Hedge Fund in Vault?',
    answer: `**You’re always in control.**  
Your funds never leave your wallet or custody. Our strategy runs on top of Drift’s Vault system — a secure and transparent platform trusted by many in the DeFi space.

**We only trade, not touch.**  
Our strategy only places trades using your deposited funds — it can’t withdraw, move, or misuse your assets. You’re free to exit and withdraw anytime.

**It runs on trusted, public code.**  
We didn’t write our own smart contracts from scratch. We use Drift’s original, battle-tested code, with no modifications. All changes are visible on Drift’s public dashboard.`,
  },
  {
    question: 'What are the smart contract risks associated with VIXII?',
    answer: `**We don’t reinvent the wheel — we build on what’s already proven.**  
VIXII doesn’t use its own custom contracts. Instead, we run entirely on Drift’s audited and widely used smart contract system.

**Why that matters:**  
Smart contract bugs are one of the biggest risks in DeFi. By leveraging well-established infrastructure, we avoid pitfalls of untested or experimental code.

All trading happens inside Drift’s ecosystem, ensuring the same level of security and transparency trusted by institutional users.`,
  },
  {
    question: 'How does the Vault generate returns?',
    answer: `The Vault earns yield from **multiple sources** working together:
- **JLP Rewards**: By providing liquidity to Jupiter DEX, we earn fees and token rewards.
- **Funding Rates**: Hedging on Drift allows us to earn yield from funding rate differences.
- **Smart Leverage**: We apply safe, optimized borrowing and hedgin*, boosting returns without extra market risk.`,
  },
  {
    question: 'Is this fund delta-neutral?',
    answer: `**Yes — it’s fully delta-neutral.**  
The strategy is designed to cancel out market movements. Whether crypto prices rise or fall, your returns stay stable.

We hedge assets like BTC, ETH, SOL, and USDT to ensure that **price swings don’t affect your earnings**.`,
  },
  {
    question: 'Is the trader’s PnL from Jupiter hedged?',
    answer: `**Yes, it’s fully hedged.**  
The Vault monitors trader positions — long or short — and continuously rebalances to stay neutral.

This means your exposure remains balanced, avoiding gains or losses from market direction.`,
  },
]


  return (
    <div className="px-4 py-20">
      <div className="max-w-xl mx-auto">
        <h2 className="text-center text-sm font-semibold text-gray-500">Frequently asked questions</h2>
        <p className="mt-2 text-center text-xl font-bold text-gray-900">Your questions answered.</p>

        <div className="mt-10 space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <button
                className="flex w-full justify-between items-center text-left text-sm font-medium text-gray-800"
                onClick={() => toggleIndex(index)}
              >
                <span className='text-xl'>{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`mt-2 overflow-hidden text-sm text-gray-600 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ReactMarkdown>{faq.answer}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
