'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { Target, Bot, Award, HelpCircle, ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


const HowItWorksPage = () => {

    const steps = [
        {
            icon: <Target className="h-10 w-10" />,
            title: "1. Set Your Goals",
            description: "Choose your target role, experience level, and tech stack to get personalized questions."
        },
        {
            icon: <Bot className="h-10 w-10" />,
            title: "2. Practice with AI",
            description: "Engage in realistic mock interviews with our advanced AI interviewer."
        },
        {
            icon: <Award className="h-10 w-10" />,
            title: "3. Get Feedback",
            description: "Receive detailed feedback and improve your performance for the real interview."
        }
    ];

    const faqs = [
        {
            question: "How does the AI interview work?",
            answer: "Our AI conducts realistic mock interviews by asking relevant questions based on your role and experience level, then provides detailed feedback on your responses."
        },
        {
            question: "Can I practice for specific companies?",
            answer: "Yes! We have company-specific question sets for major tech companies, startups, and various industries to help you prepare effectively."
        },
        {
            question: "How accurate is the feedback?",
            answer: "Our AI feedback is trained on thousands of successful interviews and provides insights on communication skills, technical accuracy, and areas for improvement."
        },
        {
            question: "Is my interview data secure?",
            answer: "Absolutely. We use enterprise-grade encryption and never share your interview data. All sessions are private and secure."
        }
    ];

    return (
        <div className="bg-white text-gray-800">
            <div className="max-w-4xl mx-auto p-6 md:p-12">
                
                {/* How It Works Section */}
                <section className="text-center mb-20">
                    <h1 className="text-4xl font-bold mb-4">How It Works</h1>
                    <p className="text-lg text-gray-500 mb-12">Master your interviews in 3 simple steps</p>
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gray-800 text-white mb-4">
                                    {step.icon}
                                </div>
                                <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
                                <p className="text-gray-600 max-w-md">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Frequently Asked Questions Section */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                             <Collapsible key={index} className="border-b">
                                <CollapsibleTrigger className="flex justify-between items-center w-full py-4 text-left">
                                    <div className='flex items-center'>
                                        <HelpCircle className="h-6 w-6 text-primary mr-4" />
                                        <span className="text-lg font-medium">{faq.question}</span>
                                    </div>
                                    <ChevronRight className="h-5 w-5 transition-transform" />
                                </CollapsibleTrigger>
                                <CollapsibleContent className="pb-4 pl-10">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </section>

                {/* Ready to Start Section */}
                <section className="text-center bg-gray-100 p-10 rounded-xl">
                    <h2 className="text-3xl font-bold mb-3">Ready to Start?</h2>
                    <p className="text-gray-600 mb-6">Join thousands of candidates who've improved their interview skills with HireBench</p>
                    <a href="/dashboard">
                        <Button size="lg" className="bg-gray-800 text-white hover:bg-gray-900">
                            Go to Dashboard
                        </Button>
                    </a>
                </section>

            </div>
        </div>
    );
};

export default HowItWorksPage;
