"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Header = () => {
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // useEffect is not strictly needed for this component's rendering, 
    // but keeping it as you had it in the original code.
    useEffect(() => {
        // console.log(path);
    }, [path]);

    const menuItems = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Questions', href: '/dashboard/questions' },
        { name: 'Upgrade', href: '/dashboard/upgrade' },
        { name: 'How it Works?', href: '/dashboard/hiw' }
    ];

    // A more robust way to check for the active path
    const isActive = (href: string) => path === href;

    return (
        <header className='relative flex items-center justify-between p-4 px-6 bg-white shadow-sm border-b'>
            {/* Logo */}
            <div className="flex-shrink-0">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="logo" width={35} height={35} />
                    <span className="text-xl font-bold text-gray-800">HireBench</span>
                </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className='hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='flex items-center gap-1'>
                    {menuItems.map((item) => (
                        <Link key={item.name} href={item.href}>
                            <div className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer 
                                ${isActive(item.href) 
                                    ? 'bg-black text-white shadow-sm' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'}`
                            }>
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* User Button & Mobile Menu Toggle */}
            <div className='flex-shrink-0 flex items-center gap-4'>
                <div className='hidden md:block'>
                    <UserButton afterSignOutUrl="/dashboard" />
                </div>
                <div className='md:hidden'>
                    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="outline" size="icon">
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t z-20'>
                    <nav className='flex flex-col p-4'>
                        {menuItems.map((item) => (
                            <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)}>
                                <div className={`px-4 py-3 rounded-md text-base font-medium transition-all cursor-pointer 
                                    ${isActive(item.href) 
                                        ? 'bg-black text-white' 
                                        : 'text-gray-700 hover:bg-gray-100'}`
                                }>
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                        <div className='border-t mt-4 pt-4 pl-4'>
                             <UserButton afterSignOutUrl="/dashboard" />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
