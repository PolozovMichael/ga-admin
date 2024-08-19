'use client'

import React from 'react'
import { MenubarSeparator } from './ui/menubar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Boxes,
  BoxIcon,
  Gift,
  LayoutDashboard,
  PersonStanding,
  Settings,
  ShieldQuestion,
  User,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'

const sidebarItems: SidebarItem[] = [
  { href: '/settings/general', label: 'General' },
  { href: '/settings/account', label: 'Account' },
  { href: '/settings/notifications', label: 'Notifications' },
  { href: '/settings/security', label: 'Security' },
  { href: '/settings/billing', label: 'Billing' },
  { href: '/settings/subscription', label: 'Subscription' },
  { href: '/settings/integrations', label: 'Integrations' },
  { href: '/settings/advanced', label: 'Advanced' },
]

export default function SettingsSidebar() {
  return (
    <div className="w-[350px] mt-5 gap-2 h-full flex flex-col">
      <div className="w-full  gap-4 flex flex-col">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full text-gray-400`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
