"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { log } from 'node:console'
import React, { useEffect } from 'react'
import Link from 'next/link'
const Header = () => {
    const path=usePathname();
    useEffect(()=>{
        console.log(path);
        
    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Image src="/logo.svg" alt="logo" width={100} height={100}/>
        <ul className='flex gap-6'>

          <Link href={"/dashboard"}> <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}>Dashboard</li></Link>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}`}>Questions</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}>Upgrade</li>
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' ? 'text-primary font-bold' : ''}`}>How it Works ?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header