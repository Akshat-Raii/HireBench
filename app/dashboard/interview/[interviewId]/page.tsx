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

    // --- LOGIC IS UNCHANGED ---
    useEffect(() => {
        async function fetchData() {
            const result = await getInterviewById(interviewId);
            setInterview(result[0]);
        }
        fetchData();
    }, [interviewId]);

    return (
        <div className="p-5 md:p-10 mx-auto max-w-6xl">
            <h2 className="font-bold text-2xl mb-8">Let's Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* ========== Left Column: Information ========== */}
                <div className="flex flex-col gap-5">
                    <div className="p-5 rounded-lg border bg-white shadow-sm">
                        {interview ? (
                            <div className="space-y-3">
                                <h2 className="text-lg">
                                    <strong>Job Role: </strong>{interview.jobPosition}
                                </h2>
                                <h2 className="text-lg">
                                    <strong>Job Description: </strong>{interview.jobDesc}
                                </h2>
                                <h2 className="text-lg">
                                    <strong>Years of Experience: </strong>{interview.jobExperience}
                                </h2>
                            </div>
                        ) : (
                            // Skeleton loader for better loading UX
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-5/6"></div>
                                <div className="h-6 bg-gray-200 rounded animate-pulse w-4/6"></div>
                            </div>
                        )}
                    </div>

                    <div className="p-5 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-800">
                        <h2 className="flex items-center gap-2 font-semibold">
                            <Lightbulb className="h-5 w-5 text-yellow-500" />
                            Information
                        </h2>
                        <p className="text-sm mt-2">
                            Once you enable the webcam and microphone, the interview will begin. Ensure you're in a quiet environment with proper lighting.
                        </p>
                    </div>
                </div>

                {/* ========== Right Column: Webcam & Actions ========== */}
                <div className="flex flex-col justify-between p-5 rounded-lg border bg-white shadow-sm">
                    {/* --- Webcam Area --- */}
                    <div className="w-full aspect-video bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                        {webCamEnabled ? (
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-center p-4">
                                <WebcamIcon className="h-24 w-24 text-gray-400" />
                                <Button variant="ghost" className="mt-4" onClick={() => setWebCamEnabled(true)}>
                                    Enable WebCam and Microphone
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* --- Start Button (Moved here from the bottom of the page) --- */}
                    <div className='flex justify-end mt-4'>
                        <Link href={`/dashboard/interview/${interviewId}/start`}>
                            <Button disabled={!interview}>
                                Start Interview
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interview;