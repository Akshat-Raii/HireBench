import { getFeedbackByMockId } from '@/utils/feedback';
import { ChevronsUpDown, Star, MessageCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

// Helper component for displaying stars
const StarRating = ({ rating }: { rating: string | number | null }) => {
    const totalStars = 5;
    // Ensure rating is a number before rounding
    const filledStars = Math.round(Number(rating) || 0);
    return (
        <div className="flex items-center gap-1">
            {[...Array(totalStars)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < filledStars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className='font-bold text-lg ml-2'>{(Number(rating) || 0).toFixed(1)}</span>
        </div>
    );
};

export default async function FeedbackPage({ params }: { params: Promise<{ interviewId: string }> }) {
  const { interviewId } = await params;
  const feedbackList = await getFeedbackByMockId(interviewId);

  if (feedbackList?.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center p-4">
            <h2 className='font-bold text-2xl text-gray-600'>No Interview Feedback Found</h2>
            <p className='text-gray-500 mt-2'>It seems like this interview has not been completed yet.</p>
            <Link href="/dashboard">
                <Button className="mt-8 flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Go Back to Dashboard
                </Button>
            </Link>
        </div>
    )
  }

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
        <div className='max-w-4xl mx-auto'>
            {/* --- Header --- */}
            <div className='text-center mb-10'>
                <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
                <p className="font-semibold text-2xl mt-1">Here is your interview feedback</p>
                <p className="text-sm text-gray-500 mt-3">
                    Find below interview questions with correct answers, your answers, and feedback for improvement.
                </p>
            </div>

            {/* --- Feedback List --- */}
            <div className='space-y-4'>
                {feedbackList.map((item, index) => (
                <Collapsible key={index} className="bg-white rounded-xl shadow-sm border">
                    <CollapsibleTrigger className="p-4 flex justify-between items-center text-left gap-4 w-full hover:bg-gray-50 transition-colors rounded-t-xl">
                        <span className='font-medium text-gray-800'>{index + 1}. {item.question}</span>
                        <ChevronsUpDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className='p-4 border-t'>
                        <div className="flex flex-col gap-4">
                            {/* Rating */}
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                <h3 className="font-semibold text-blue-800 flex items-center gap-2 mb-2"><Star className='h-4 w-4'/>Rating</h3>
                                <StarRating rating={item.rating} />
                            </div>
                            {/* Your Answer */}
                            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                <h3 className="font-semibold text-purple-800 flex items-center gap-2 mb-2"><MessageCircle className='h-4 w-4'/>Your Answer</h3>
                                <p className='text-sm text-gray-700'>{item.userAns}</p>
                            </div>
                            {/* Correct Answer */}
                            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                <h3 className="font-semibold text-green-800 flex items-center gap-2 mb-2"><CheckCircle className='h-4 w-4'/>Correct Answer</h3>
                                <p className='text-sm text-gray-700'>{item.correctAns}</p>
                            </div>
                             {/* Feedback */}
                            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                                <h3 className="font-semibold text-yellow-800 flex items-center gap-2 mb-2"><MessageCircle className='h-4 w-4'/>Feedback</h3>
                                <p className='text-sm text-gray-700'>{item.feedback}</p>
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
                ))}
            </div>

            <div className='text-center mt-10'>
                <Link href="/dashboard">
                    <Button className="flex items-center gap-2 mx-auto">
                        <ArrowLeft className="h-4 w-4" /> Go Home
                    </Button>
                </Link>
            </div>
        </div>
    </div>
  );
}
