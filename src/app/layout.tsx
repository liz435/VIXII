import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import NavbarWrapper from '@/components/NavbarWrapper'


export const metadata: Metadata = {
  title: {
    template: '%s - Radiant',
    default: 'VIXII DeFi Hedge Fund Strategies for Everyone',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>

        {/* <link
          rel="alternate"
          type="application/rss+xml"
          title="The Radiant Blog"
          href="/blog/feed.xml"
        /> */}
        <script src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.25/dist/unicornStudio.umd.js"></script>
      </head>
      <body className="text-gray-950 antialiased">
        {children}</body>
    </html>
  )
}
