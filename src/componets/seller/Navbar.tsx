"use client"
import { assets } from '@/assets/assets'
import { SignOutButton } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const router = useRouter()
  return (
    <header className='flex items-center section py-3 justify-between border-b border-gray-300'>
      <Image onClick={()=>router.push('/')} className='cursor-pointer' src={assets.logo} alt="logo" />
      <div className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor pointer'>
        <SignOutButton>
          Logout
        </SignOutButton>
        </div>
    </header>
  )
}

export default Navbar