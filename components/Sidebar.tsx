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
  PersonStandingIcon,
  Settings,
  ShieldQuestion,
  User,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'

const sidebarItems: SidebarItem[] = [
  { href: '/', icon: <LayoutDashboard width={16} />, label: 'Home' },
  { href: '/products', icon: <BoxIcon width={16} />, label: 'Products' },
  {
    href: '/services',
    icon: <PersonStandingIcon width={16} />,
    label: 'Services',
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
    </div>
  )
}
