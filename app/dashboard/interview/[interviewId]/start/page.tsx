'use client'
import React, { useEffect, useState, use } from 'react'
import { getInterviewById } from '@/app/actions/getInterviewById';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const StartInterview = ({ params }: { params: Promise<{ interviewId: string }> }) => {
  const { interviewId } = use(params);
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
  const [interviewData, setInterviewData] = useState<any>(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any>(null);

  const handleNextQuestion = () => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
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
      const jsonMockResp = JSON.parse(result[0].jsonMockResp);
      setInterviewData(result[0]);
      setMockInterviewQuestion(jsonMockResp);
      console.log(jsonMockResp);
    }
    fetchData();
  }, [interviewId]);

  return (
    <div >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <QuestionsSection 
              mockInterviewQuestion={mockInterviewQuestion}
              activeQuestionIndex={activeQuestionIndex}
              
            />
            <RecordAnsSection
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>
         {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
          {activeQuestionIndex!=mockInterviewQuestion?.length-1 &&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
          <Link href={"/dashboard/interview/"+interviewData?.mockId+"/feedback"}>
          {activeQuestionIndex==mockInterviewQuestion?.length-1 &&<Button>End Interview</Button>}
          </Link>
        </div>
    </div>
  )
}

export default StartInterview;
