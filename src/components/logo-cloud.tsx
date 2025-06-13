'use client'

import { clsx } from 'clsx'
import Image from 'next/image'

const logos = [
  { alt: 'jupiter', src: '/logo-cloud/jupiter.svg' },
  { alt: 'solana', src: '/logo-cluster/solana-sol-logo.svg' },
  { alt: 'drift', src: '/logo-cloud/drift2.png' },
  { alt: 'btc', src: '/logo-cluster/bitcoin-btc-logo.svg' },
  { alt: 'jup', src: '/logo-cluster/jupiter-ag-jup-logo.svg' },
  { alt: 'eth', src: '/logo-cluster/ethereum-eth-logo.svg' },
  { alt: 'usdc', src: '/logo-cluster/usd-coin-usdc-logo.svg' },
  { alt: 'usdt', src: '/logo-cluster/tether-usdt-logo.svg' },
]

export function LogoCloud({ className }: React.ComponentPropsWithoutRef<'div'>) {
  // 创建足够的副本确保流畅滚动
  const duplicatedLogos = [...logos, ...logos, ...logos]
  
  return (
    <div className={clsx(className, 'relative overflow-hidden w-full')}>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .scroll-animation {
          animation: scroll 30s linear infinite;
        }
        
        .scroll-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="flex scroll-animation">
        {duplicatedLogos.map((logo, i) => (
          <div key={i} className="flex-shrink-0 px-12">
            <Image
              alt={logo.alt}
              src={logo.src}
              width={120}
              height={48}
              className="h-9 w-auto max-sm:mx-auto sm:h-8 lg:h-12 object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  )
}