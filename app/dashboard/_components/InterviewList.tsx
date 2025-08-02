"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getInterviewListByEmail } from "@/utils/getInterviewList";

interface Interview {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string | null;
  mockId: string;
}

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<Interview[] | null>(null); // Initialize as null for loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    setLoading(true);
    const emailAddress = user?.primaryEmailAddress?.emailAddress;
    if (emailAddress) {
      const result = await getInterviewListByEmail(emailAddress);
      setInterviewList(result);
    }
    setLoading(false);
  };

  // A skeleton component to show while data is loading
  const LoadingSkeleton = () => (
    <div className="border shadow-sm rounded-xl p-5 bg-white animate-pulse">
        <div className="flex justify-between items-start mb-3">
            <div className="space-y-2">
                <Skeleton className="h-6 w-40 rounded bg-gray-200" />
                <Skeleton className="h-4 w-32 rounded bg-gray-200" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full bg-gray-200" />
        </div>
        <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-4 w-48 rounded bg-gray-200" />
            <Skeleton className="h-4 w-12 rounded bg-gray-200" />
        </div>
        <div className="flex justify-end mt-5">
            <Skeleton className="h-10 w-full rounded-lg bg-gray-200" />
        </div>
    </div>
  );

  return (
    <div>
      <h2 className="font-bold text-2xl mb-6">Previous Mock Interviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {loading ? (
          // Displaying multiple skeletons for a better loading effect
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          interviewList?.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewList;
