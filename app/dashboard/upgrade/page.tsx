'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Crown } from 'lucide-react';

const UpgradePage = () => {

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/forever",
            features: [
                "5 mock interviews per month",
                "Basic feedback",
                "Standard questions library",
                "Email support"
            ],
            isCurrent: true,
            isPopular: false
        },
        {
            name: "Pro",
            price: "$19",
            period: "/per month",
            features: [
                "Unlimited mock interviews",
                "Advanced AI feedback",
                "Complete questions library",
                "Performance analytics",
                "Priority support",
                "Custom interview scenarios"
            ],
            isCurrent: false,
            isPopular: true
        },
        {
            name: "Enterprise",
            price: "$99",
            period: "/per month",
            features: [
                "Everything in Pro",
                "Team management",
                "Custom branding",
                "API access",
                "Dedicated support",
                "Advanced reporting"
            ],
            isCurrent: false,
            isPopular: false
        }
    ];

    return (
        <div className="bg-white text-gray-800 font-sans">
            <div className="max-w-4xl mx-auto p-6 md:p-12">
                
                {/* Header */}
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-3">Choose Your Plan</h1>
                    <p className="text-lg text-gray-500">Unlock your potential with the right plan for you</p>
                </section>

                {/* Pricing Cards */}
                <section className="space-y-8">
                    {plans.map((plan, index) => (
                        <div key={index} className={`border rounded-xl p-8 relative ${plan.isPopular ? 'border-2 border-gray-800' : 'border-gray-200'}`}>
                            {plan.isPopular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    Most Popular
                                </div>
                            )}
                            <h2 className="text-2xl font-bold text-center mb-2">{plan.name}</h2>
                            <p className="text-5xl font-bold text-center mb-4">
                                {plan.price}
                                <span className="text-lg font-medium text-gray-500">{plan.period}</span>
                            </p>
                            <ul className="space-y-3 my-8">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-3" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button 
                                size="lg" 
                                className={`w-full text-lg ${plan.isCurrent ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-900'}`}
                                disabled={plan.isCurrent}
                            >
                                {plan.isCurrent ? 'Current Plan' : 'Upgrade Now'}
                            </Button>
                        </div>
                    ))}
                </section>

                {/* Final CTA */}
                <section className="text-center bg-gray-800 text-white mt-20 p-10 rounded-xl">
                    <Crown className="h-12 w-12 mx-auto text-yellow-400 mb-4" />
                    <h2 className="text-3xl font-bold mb-3">Ready to Level Up?</h2>
                    <p className="text-gray-300 mb-6">Join thousands of successful candidates who've landed their dream jobs</p>
                    <Button size="lg" variant="outline" className="bg-white text-gray-800 hover:bg-gray-200 border-transparent">
                        Start Free Trial
                    </Button>
                </section>

            </div>
        </div>
    );
};

export default UpgradePage;
