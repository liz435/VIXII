// app/NavbarWrapper.tsx
'use client'

import { Navbar } from '@/components/navbar'
import { ChevronRightIcon } from 'lucide-react'

export default function NavbarWrapper() {
  return  <Navbar
            banner={
              <button
              
                className="z-10 flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30"
              >
                Assets Under Management (AUM) reached RMB 3.8 billion
                <ChevronRightIcon className="size-4" />
              </button>
            }
          />
}
