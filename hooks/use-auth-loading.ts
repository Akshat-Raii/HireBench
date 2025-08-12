'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useAuthLoading() {
  const { user, isLoaded, isSignedIn } = useUser()
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("Setting up your account...")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If we're on auth pages and user just signed in, show loading
    if (isLoaded && isSignedIn && user && (pathname.includes('/sign-in') || pathname.includes('/sign-up'))) {
      setIsAuthLoading(true)
      setLoadingMessage("Redirecting to dashboard...")
      
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        router.push('/dashboard')
      }, 1500)

      return () => clearTimeout(timer)
    }

    // If we're still loading and on auth pages
    if (!isLoaded && (pathname.includes('/sign-in') || pathname.includes('/sign-up'))) {
      setIsAuthLoading(false) // Let Clerk handle its own loading
    }

    // Reset loading state when we're not on auth pages
    if (isLoaded && !pathname.includes('/sign-in') && !pathname.includes('/sign-up')) {
      setIsAuthLoading(false)
    }
  }, [isLoaded, isSignedIn, user, pathname, router])

  return {
    isAuthLoading,
    loadingMessage,
    setIsAuthLoading,
    setLoadingMessage
  }
}
