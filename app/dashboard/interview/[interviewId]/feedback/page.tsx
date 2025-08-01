import { getFeedbackByMockId } from '@/utils/feedback';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

export default async function FeedbackPage({ params }: { params: { interviewId: string } }) {
  const feedbackList = await getFeedbackByMockId(params.interviewId);

  return (
    <div className="p-10">
        {feedbackList?.length==0?
        <h2 className='font-bold text-xl text-gray-500'>No Interview Feedbacks Present</h2>
        :
        <>    
            <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
            <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
            <h2 className="text-primary text-lg my-3">Your overall interview rating: <strong></strong></h2>
            <h2 className="text-sm text-gray-500 mb-5">
                Find below interview questions with correct answers, your answers, and feedback for improvement.
            </h2>
            {feedbackList.map((item, index) => (
            <Collapsible key={index} className="mt-4">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between text-left gap-4 w-full">
                {item.question} <ChevronsUpDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="flex flex-col gap-2 mt-2">
                <h2 className="text-blue-500 p-2 border rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm">
                    <strong>Your Answer:</strong> {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm">
                    <strong>Correct Answer:</strong> {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-purple-50 text-sm">
                    <strong>Feedback:</strong> {item.feedback}
                </h2>
                </div>
            </CollapsibleContent>
            </Collapsible>
            ))}
        </>

    }
      

      
      <Link href="/dashboard">
        <Button className="mt-6">Go Home</Button>
      </Link>
    </div>
  );
}
