import { Container } from "@/components/container"
import { Heading, Lead } from "@/components/text"

export function JLPExplanationSection() {
  return (
    <div className="relative py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Heading as="h2" className="text-gray-950">
            Built on Jupiter&apos;s Proven Revenue Model
          </Heading>
          <Lead className="mt-8 text-gray-950/75 leading-relaxed">
            One of the key sources of alpha comes from JLP — the Jupiter Liquidity Provider token. Since launch, the
            Jupiter aggregator has generated over $180 million in fees, with 75% contractually allocated back to JLP
            holders. This creates a robust yield foundation for liquidity providers.
          </Lead>
          <Lead className="mt-6 text-gray-950/75 leading-relaxed">
            However, holding JLP also exposes users to crypto price volatility and directional risk from trader PnL. Our
            strategy is designed to hedge these exposures by shorting the underlying assets (SOL, ETH, and BTC),
            effectively neutralizing market and PnL risks while capturing the protocol&apos;s stable fee returns.
          </Lead>
        </div>
      </Container>
    </div>
  )
}
