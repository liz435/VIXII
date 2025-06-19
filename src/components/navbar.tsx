"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

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
  { href: "/contact", label: "Contact" },
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectorStyle, setSelectorStyle] = useState({ top: 0, height: 0 })
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // 动态计算选择器位置和高度
  useEffect(() => {
    if (hoveredIndex !== null && itemRefs.current[hoveredIndex]) {
      const element = itemRefs.current[hoveredIndex]
      if (element) {
        const rect = element.getBoundingClientRect()
        const parentRect = element.parentElement?.getBoundingClientRect()
        
        if (parentRect) {
          setSelectorStyle({
            top: element.offsetTop-7,
            height: element.offsetHeight-5,
          })
        }
      }
    }
  }, [hoveredIndex])

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => {
        setIsOpen(false)
        setHoveredIndex(null)
      }}
    >
      <button className="relative flex items-center px-4 py-6 text-base font-medium text-gray-950 bg-blend-multiply hover:bg-black/[2.5%] overflow-hidden">
        Product
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-950 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full backdrop-blur-md z-50 pt-1 w-80 origin-top-left"
          >
            <div className="relative rounded-xl bg-white/70 p-2 shadow-lg ring-1 ring-black/5">
              {/* 滑动选择器背景 */}
              <AnimatePresence>
                {hoveredIndex !== null && (
                  <motion.div
                    layoutId="dropdown-selector"
                    className="absolute bg-white/90 border  rounded-lg left-2 right-2"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      y: selectorStyle.top,
                      height: selectorStyle.height,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 30,
                      opacity: { duration: 0.1 }
                    }}
                  />
                )}
              </AnimatePresence>
              
              {/* 菜单项 */}
              {productCategories.map((item, index) => (
                <div
                  key={item.href}
                  ref={(el) => {
              itemRefs.current[index] = el
            }}

                  className="relative rounded-lg transition-colors duration-150 z-10"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-start gap-3 p-3 hover:bg-transparent block"
                  >
                    <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-150 ${
                      hoveredIndex === index 
                        ? 'bg-gray-100 shadow-sm' 
                        : 'bg-white'
                    }`}>
                      <item.icon className={`size-5 transition-colors duration-150 ${
                        hoveredIndex === index 
                          ? 'text-gray-700' 
                          : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium transition-colors duration-150 ${
                        hoveredIndex === index 
                          ? 'text-gray-900' 
                          : 'text-gray-900'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`text-sm transition-colors duration-150 ${
                        hoveredIndex === index 
                          ? 'text-gray-600' 
                          : 'text-gray-400'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
export default ProductDropdown

const startButtonVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
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
      className="relative flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-[hover]:bg-black/[2.5%] group overflow-hidden"
    >
      {label}
      {/* Sliding underline */}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-950 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
    </Link>
  </PlusGridItem>
))}

<PlusGridItem className="relative flex">
  <Button 
    href="/login" 
    className="relative mt-3 mb-3 group overflow-hidden transform transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] active:scale-95 active:translate-y-0"
  >
    Login &nbsp; <ArrowUpRight strokeWidth={1} className="transition-transform duration-300 group-hover:rotate-12" />
   
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
                <Logo />
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