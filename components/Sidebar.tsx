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
  { href: '/', icon: <LayoutDashboard width={16} />, label: 'Home' },
  { href: '/orders', icon: <Boxes width={16} />, label: 'Orders' },
  {
    href: '/customers',
    icon: <PersonStanding width={16} />,
    label: 'Customers',
  },
  { href: '/products', icon: <BoxIcon width={16} />, label: 'Products' },
  { href: '/settings', icon: <Settings width={16} />, label: 'Settings' },
  {
    href: '/user-management',
    icon: <User width={16} />,
    label: 'User management',
  },
  {
    href: '/special-offers-settings',
    icon: <Gift width={16} />,
    label: 'Special offers settings',
  },
  {
    href: '/faq-settings',
    icon: <ShieldQuestion width={16} />,
    label: 'FAQ settings',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-[350px] gap-2 h-full flex flex-col border p-3 rounded-[15px]">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-lg font-bold">GA Marketplace</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <MenubarSeparator />
      <div className="w-full gap-1 flex flex-col">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`w-full p-3 rounded-[10px] flex items-center gap-1 ${
              pathname === item.href ? 'bg-secondary' : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <MenubarSeparator />
      <div className="w-full">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
          <p className="text-sm text-muted-foreground">
            An open-source UI component library.
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    </div>
  )
}
