'use client';

import React, { useEffect, useState } from 'react';
import { SignIn } from '@clerk/nextjs'
import { useAuthLoading } from '@/hooks/use-auth-loading'
import { AuthLoadingScreen } from '@/components/auth-loading-screen'
const quotes = [
  "Believe you can and you're halfway there.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "You miss 100% of the shots you don't take.",
  "Don't watch the clock; do what it does. Keep going.",
  "The best way to get started is to quit talking and begin doing.",
];


export default function Page() {
    const [quote, setQuote] = useState('');
    const { isAuthLoading, loadingMessage } = useAuthLoading();

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);
    return(
        <>
            {isAuthLoading && <AuthLoadingScreen message={loadingMessage} />}
            <div className="flex min-h-screen">
            {/* Left Side - Quote */}
            <div className="w-1/2 bg-gray-900 text-white flex items-center justify-center p-10">
                <blockquote className="text-2xl italic font-semibold max-w-md text-center">
                “{quote}”
                </blockquote>
            </div>

            {/* Right Side - Login */}
            <div className="w-1/2 flex items-center justify-center bg-white">
                <div className="w-full max-w-md p-8 space-y-6 border rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
                <SignIn 
                    path='/sign-in'
                    routing='path'
                    signUpUrl='/sign-up'
                    afterSignInUrl='/dashboard'
                />
                </div>
            </div>
            </div>
        </>
    ) 
}