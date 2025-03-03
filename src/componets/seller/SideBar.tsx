"use client"
import {List, SquarePlus, Box} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const menuItems= [
      { name: 'Add Product', path: '/seller', icon: <SquarePlus /> },
      { name: 'Product List', path: '/seller/product-list', icon: <List/> },
      { name: 'Orders', path: '/seller/orders', icon: <Box/> },
  ] as const;

const SideBar = () => {
    const pathname = usePathname()
  return (
    <aside className='flex flex-col border-r border-gray-300 py-2 min-h-[calc(100vh-61px)] w-16 md:w-64 text-base'>
        <ul className="sticky top-4 left-0">
            {menuItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                <li key={item.name}>
                    <Link href={item.path} className={
                                `flex items-center py-3 px-4 gap-3 ${isActive
                                    ? "border-r-4 md:border-r-[6px] bg-orange-600/10 border-orange-500/90"
                                    : "hover:bg-gray-100/90 border-white"
                                }`
                            }>
                        {item.icon}
                        <p className='md:block hidden text-center'>{item.name}</p>
                    </Link>
                </li>)
            })}
        </ul>
    </aside>
  )
}

export default SideBar