import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Calendar, Star, MessageSquare } from 'lucide-react';

interface Interview {
  mockId: string;
  jobPosition: string;
  jobExperience: string;
  createdAt: string | null;
}

interface InterviewItemCardProps {
  interview: Interview;
}

const InterviewItemCard = ({ interview }: InterviewItemCardProps) => {
    const router = useRouter();

    const onFeedback = () => {
        router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
    };

    // Format date for better readability, with a fallback
    const formattedDate = interview?.createdAt 
        ? new Date(interview.createdAt).toLocaleDateString("en-US", {
            year: 'numeric', month: 'short', day: 'numeric'
          })
        : 'N/A';

    return (
        <div className="border shadow-sm rounded-xl p-5 bg-white transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col h-full">
            {/* Main content area */}
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h2 className='font-bold text-lg text-primary'>{interview?.jobPosition}</h2>
                        <h3 className='text-sm text-gray-600'>{interview?.jobExperience} Years of experience</h3>
                    </div>
                    {/* Status Badge */}
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                        Completed
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                    {/* Date */}
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Created {formattedDate}</span>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-semibold text-gray-700">4.5</span>
                    </div>
                </div>
            </div>

            {/* Button at the bottom */}
            <div className='mt-5'>
                <Button
                    onClick={onFeedback}
                    variant="outline"
                    className="flex items-center gap-2 w-full bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-300"
                >
                    <MessageSquare className="h-4 w-4" />
                    Feedback
                </Button>
            </div>
        </div>
    );
};

export default InterviewItemCard;
