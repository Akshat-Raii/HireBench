'use client';

import React, { useEffect, useState } from 'react';
import { getInterviewById } from '@/app/actions/getInterviewById';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Interview = ({ params }: { params: { interviewId: string } }) => {
  const interviewId = params.interviewId;
  const [interview, setInterview] = useState<any>(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getInterviewById(interviewId);
      setInterview(result[0]);
    }
    fetchData();
  }, [interviewId]);

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        <div className="flex flex-col gap-5">
          <div className="p-5 rounded-lg border flex flex-col gap-3">
            {interview ? (
              <>
                <h2 className="text-lg">
                  <strong>Job Role: </strong>
                  {interview.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description: </strong>
                  {interview.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience: </strong>
                  {interview.jobExperience}
                </h2>
              </>
            ) : (
              <p>Loading interview details...</p>
            )}
          </div>

          <div className="p-5 rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex items-center gap-2 text-lg font-medium">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Information
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Once you enable the webcam and microphone, the interview will begin.
              Ensure you're in a quiet environment with proper lighting.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button variant="ghost" onClick={() => setWebCamEnabled(true)}>
                Enable WebCam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='flex justify-end items-end'>
        <Link href={"/dashboard/interview/"+interviewId+"/start"}>
      <Button >
            Start Interview
      </Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
