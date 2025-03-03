"use client"
import { assets, links } from '@/assets/assets'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { AlignJustify, Box, Heart, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [isSidebarOpen, setIsSideBarOpen] = useState(false)
    const router = useRouter()


  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }}, [isSidebarOpen])
  return (
    <header className='py-3 flex justify-between border-b border-gray-300 section text-gray-700 relative'>
        <Link href="/">
        <Image 
            className="cursor-pointer w-28 md:w-32"
            src={assets.logo}
            alt="logo"
        />
        </Link>
        <div className='flex flex-col md:flex-row gap-4 lg:gap-8'>
        <nav className={`flex z-20 md:hidden items-center absolute h-[calc(100vh-55px)] text-2xl bg-white w-full top-[55px] ${isSidebarOpen ? "left-0" : "-left-full"} transition-all duration-500`}>
            <ul className='w-full flex flex-col items-center justify-center gap-6'>
                <SignedIn>
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="Cart" labelIcon={<ShoppingCart size={14}/>} onClick={() => {router.push('/cart'); setIsSideBarOpen(false)}}/>
                            <UserButton.Action label="Favorite Items" labelIcon={<Heart size={14}/>} onClick={() => {router.push('/favorite'); setIsSideBarOpen(false)}}/>
                            <UserButton.Action label="My Orders" labelIcon={<Box size={14}/>} onClick={() => {router.push('/my-orders') ; setIsSideBarOpen(false)}}/>
                        </UserButton.MenuItems>
                    </UserButton>  
                </SignedIn>
                {links.map((link) => (
                    <li key={link.name} className='flex items-center hover:text-orange-600 transition'>
                        <Link href={link.href} onClick={() => setIsSideBarOpen(prev => !prev)}>
                            {link.name}
                        </Link>
                    </li>
                ))}
                <SignedOut>
                    <li>
                        <span className='flex gap-2 items-center hover:text-orange-600 cursor-pointer transition'>
                            <SignInButton>
                                Sign In
                            </SignInButton>
                        </span>
                    </li>
                </SignedOut>
            </ul>
        </nav >
        <nav className='hidden md:flex'>
            <ul className='flex gap-4 lg:gap-8'>
                {links.map((link) => (
                    <li key={link.name} className='flex items-center hover:text-orange-600 transition'>
                        <Link  
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
        <div className='flex gap-4'>
            <Link href="/seller" className='flex items-center text-xs border px-4 py-1.5 rounded-full hover:text-orange-600 transition'>
                Seller Dashboard
            </Link>
            <button className='md:hidden cursor-pointer' onClick={() => setIsSideBarOpen(prev => !prev)}>
                <AlignJustify/>
            </button>
        </div>
        </div>
        <span className='md:flex gap-2 items-center hidden hover:text-orange-600 cursor-pointer transition'>
            <SignedOut>
            <User className='border-2 rounded-full'/>
            </SignedOut>
            <SignedOut>
                <SignInButton>
                    Sign In
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label="Cart" labelIcon={<ShoppingCart size={14}/>} onClick={() => router.push('/cart')}/>
                        <UserButton.Action label="Favorite Items" labelIcon={<Heart size={14}/>} onClick={() => router.push('/favorite')}/>
                        <UserButton.Action label="My Orders" labelIcon={<Box size={14}/>} onClick={() => router.push('/my-orders')}/>
                    </UserButton.MenuItems>
                </UserButton>
            </SignedIn>
            <SignedIn>
                Account
            </SignedIn>
        </span>
        
    </header>
  )
}

export default Navbar