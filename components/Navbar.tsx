import React from 'react'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'
import {
  Box,
  ExternalLinkIcon,
  LayoutDashboard,
  List,
  ListOrdered,
  PersonStanding,
  Settings,
} from 'lucide-react'

export default function Navbar() {
  return (
    <Menubar className="w-fit rounded-[15px] p-2 h-fit">
      <MenubarMenu>
        <MenubarTrigger>User</MenubarTrigger>
        <MenubarContent className="rounded-[10px]">
          <MenubarItem className="flex gap-1 items-center">
            User settings<Settings width={14} />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-1 items-center">
            Exit <ExternalLinkIcon width={14} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
        <MenubarContent className="rounded-[10px]">
          <MenubarItem className="flex gap-1 items-center">
            Home <LayoutDashboard width={14} />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-1 items-center">
            Orders <List width={14} />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-1 items-center">
            Products <Box width={14} />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-1 items-center">
            Clients <PersonStanding width={14} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent className="rounded-[10px]">
          <MenubarItem className="flex gap-1 items-center">
            Orders <List width={14} />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-1 items-center">
            Products <Box width={14} />
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem className="flex gap-1 items-center">
            Clients <PersonStanding width={14} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
