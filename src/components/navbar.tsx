"use client"

import type React from "react"
import { useState } from "react"

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import { Bars2Icon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "./link"
import { Logo } from "./logo"
import { PlusGrid, PlusGridItem, PlusGridRow } from "./plus-grid"
import { Button } from "@/components/button"
import { ArrowUpRight, BarChart3, MessageSquare, Megaphone } from "lucide-react"

const links = [
  { href: "/company", label: "About Us" },
  { href: "/blog", label: "Contact" },
]

const productCategories = [
  {
    href: "/pricing?tier=starter",
    label: "Strategy 1",
    description: "Track performance and gain valuable insights",
    icon: BarChart3,
  },
  {
    href: "/pricing?tier=growth",
    label: "Strategy 2",
    description: "Grow your audience and boost engagement",
    icon: Megaphone,
  },
  {
    href: "/pricing?tier=enterprise",
    label: "Strategy 3",
    description: "Deliver exceptional customer experiences",
    icon: MessageSquare,
  },
]

function ProductDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center px-4 py-6 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-black/[2.5%]">
        Product
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 pt-1 w-80 origin-top-left"
          >
            <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5">
              {productCategories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200">
                    <item.icon className="size-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      <PlusGridItem className="relative flex">
        <ProductDropdown />
      </PlusGridItem>

      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%]"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}

      <PlusGridItem className="relative flex">
        <Button href="/login" className="mt-3 mb-3">
          Login &nbsp; <ArrowUpRight strokeWidth={1} />
        </Button>
      </PlusGridItem>
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {/* Product section with categories */}
        <div>
          <div className="text-base font-medium text-gray-950 mb-3">Product</div>
          <div className="ml-4 space-y-3">
            {productCategories.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, rotateX: -90 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.15,
                  ease: "easeInOut",
                  rotateX: { duration: 0.3, delay: index * 0.1 },
                }}
                key={item.href}
              >
                <Link href={item.href} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other navigation links */}
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
              rotateX: { duration: 0.3, delay: (linkIndex + productCategories.length) * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium text-gray-950">
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <Logo className="h-9" />
              </Link>
            </PlusGridItem>
            {banner && <div className="relative hidden items-center py-3 lg:flex">{banner}</div>}
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  )
}