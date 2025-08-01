import { Lightbulb, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        setIsSpeaking(true);
        speech.onend = () => {
          setIsSpeaking(false);
        };
      }
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };

  return mockInterviewQuestion && (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeQuestionIndex === index
                ? 'bg-black text-white'
                : 'bg-secondary text-black'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className='my-5 text-md md:text-lg'>
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>

      <div className='flex items-center gap-4 my-4'>
        {isSpeaking ? (
          <VolumeX
            className='cursor-pointer text-red-500'
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        ) : (
          <Volume2
            className='cursor-pointer'
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        )}

        
      </div>

      <div className='border-rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-700'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>
          Click on Record Answer when you want to answer the question. At the end
          of the interview we will give you the feedback along with the correct
          answer for each of the questions.
        </h2>
      </div>
    </div>
  );
};

export default QuestionsSection;
