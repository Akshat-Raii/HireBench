'use client'
import React, { useEffect, useState, use } from 'react'
import { getInterviewById } from '@/app/actions/getInterviewById';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const StartInterview = ({ params }: { params: Promise<{ interviewId: string }> }) => {
  const { interviewId } = use(params);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  const [interviewData, setInterviewData] = useState<any>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any[] | null>(null);

  // --- LOGIC IS UNCHANGED ---
  const handleNextQuestion = () => {
    if (mockInterviewQuestion && activeQuestionIndex < mockInterviewQuestion.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getInterviewById(interviewId);
      if (result && result.length > 0) {
        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setInterviewData(result[0]);
        setMockInterviewQuestion(jsonMockResp);
      }
    }
    fetchData();
  }, [interviewId]);
  // --- END OF UNCHANGED LOGIC ---


  // Loading state for better UX
  if (!mockInterviewQuestion) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <h2 className="text-center text-xl font-semibold mt-4">Loading Interview...</h2>
        </div>
    );
  }

  const isLastQuestion = activeQuestionIndex === mockInterviewQuestion.length - 1;

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Left Panel: Questions */}
            <div className="p-5 border rounded-lg bg-white shadow-md">
                <QuestionsSection 
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
            </div>

            {/* Right Panel: Video & Controls */}
            <div className='flex flex-col justify-between p-5 border rounded-lg bg-white shadow-md'>
                {/* Video Section */}
                <div>
                    <RecordAnsSection
                        mockInterviewQuestion={mockInterviewQuestion}
                        activeQuestionIndex={activeQuestionIndex}
                        interviewData={interviewData}
                    />
                </div>
                
                {/* Controls Section - Moved from bottom of the page */}
                <div className='flex justify-between items-center mt-6'>
                    <Button 
                        onClick={handlePreviousQuestion} 
                        disabled={activeQuestionIndex === 0}
                        variant="outline"
                        className='flex items-center gap-2'
                    >
                        <ArrowLeft /> Previous
                    </Button>
                    
                    {isLastQuestion ? (
                        <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                            <Button className='flex items-center gap-2 bg-green-600 hover:bg-green-700'>
                                End Interview <CheckCircle />
                            </Button>
                        </Link>
                    ) : (
                        <Button 
                            onClick={handleNextQuestion}
                            className='flex items-center gap-2'
                        >
                            Next Question <ArrowRight />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default StartInterview;
