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

export default function Sidebar() {
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
        <div className="bg-card p-3 rounded-[10px] w-full flex items-center gap-1">
          <LayoutDashboard width={16} />
          <Link className="" href="/">
            Home
          </Link>
        </div>
        <div className="w-full p-3 rounded-[10px] flex items-center gap-1">
          <Boxes width={16} />
          <Link className="" href="/orders">
            Orders
          </Link>
        </div>
        <div className="w-full p-3 rounded-[10px] flex items-center gap-1">
          <PersonStanding width={16} />
          <Link className="" href="/customers">
            Customers
          </Link>
        </div>
        <div className="w-full p-3 rounded-[10px] flex items-center gap-1">
          <BoxIcon width={16} />
          <Link className="" href="/products">
            Products
          </Link>
        </div>
        <div className="w-full p-3 rounded-[10px] flex items-center gap-1">
          <Settings width={16} />
          <Link className="" href="/settings">
            Settings
          </Link>
        </div>
        <div className="w-full p-3 rounded-[10px] flex items-center gap-1">
          <User width={16} />
          <Link className="" href="/user-management">
            User management
          </Link>
        </div>
        <div className="w-full p-3 rounded-[10px] flex items-center gap-1">
          <Gift width={16} />
          <Link className="" href="/special-offers-settings">
            Special offers settings
          </Link>
        </div>
        <div className="w-full p-3 rounded-[10px] flex items-center gap-1">
          <ShieldQuestion width={16} />
          <Link className="" href="/faq-settings">
            FAQ settings
          </Link>
        </div>
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
