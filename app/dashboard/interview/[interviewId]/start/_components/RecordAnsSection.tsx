import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { main } from '@/utils/aimodel';
import { saveAnswerToDB } from '@/utils/saveAnswerToDb';

interface Question {
  question: string;
  answer: string;
}

interface InterviewData {
  mockId: string;
}

interface RecordAnsSectionProps {
  mockInterviewQuestion: Question[];
  activeQuestionIndex: number;
  interviewData: InterviewData;
}

const RecordAnsSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }: RecordAnsSectionProps) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    const fullTranscript = results.map(r => typeof r === 'string' ? r : r.transcript).join(' ');
    setUserAnswer(fullTranscript);

    if (!isRecording && fullTranscript.length > 0) {
      console.log("Transcript captured:", fullTranscript);
    }
  }, [results, isRecording]);

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();

      setTimeout(async () => {
        const finalTranscript = results.map(r => typeof r === 'string' ? r : r.transcript).join(' ').trim();

        if (finalTranscript.length < 10) {
          toast("Error: Answer too short. Try again.");
          return;
        }

        setUserAnswer(finalTranscript);
        await updateUserAnswer(finalTranscript);
      }, 1000); // slight delay to ensure final words are captured
    } else {
      setUserAnswer('');
      startSpeechToText();
    }
  };

  const updateUserAnswer = async (answer: string) => {
    console.log("Saving user answer:", answer);
    setLoading(true);

    try {
      const feedbackPrompt = 'Question' + mockInterviewQuestion[activeQuestionIndex]?.question + 'User Answer: ' + answer + "Please give a rating and feedback. Output JSON with 'rating' and 'feedback' fields.";
      const result = await main(feedbackPrompt);
      const mockJsonResp = result.replace('```json', '').replace('```', '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await saveAnswerToDB({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: answer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress ?? '',
        createdAt: moment().format("DD-MM-yyyy")
      });

      if (resp.success) {
        toast("Answer recorded successfully");
        setUserAnswer('');
        setResults([]);
      } else {
        toast("Error saving answer.");
      }
    } catch (error) {
      toast("Error during feedback generation or saving.");
      console.error("updateUserAnswer error:", error);
    }
    setResults([]);
    setUserAnswer('');
    setLoading(false);
  };

  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='flex flex-col justify-center items-center rounded-lg my-20 relative'>
        <Image src='/web-camera.png' width={200} height={200} alt="webcam" className='absolute' />
        <Webcam mirrored={true} style={{ height: 300, width: '100%', zIndex: 10 }} />
      </div>

      <Button variant="outline" className='my-10' onClick={startStopRecording}>
        {isRecording ? (
          <h2 className='text-red-600 flex gap-2'><Mic /> Stop Recording</h2>
        ) : 'Record Answer'}
      </Button>
    </div>
  );
};

export default RecordAnsSection;
