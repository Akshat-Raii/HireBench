'use server';

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';

export const saveAnswerToDB = async ({
  mockIdRef,
  question,
  correctAns,
  userAns,
  feedback,
  rating,
  userEmail,
  createdAt
}: {
  mockIdRef: string;
  question: string;
  correctAns: string;
  userAns: string;
  feedback: string;
  rating: string;
  userEmail: string;
  createdAt: string;
}) => {
  try {
    await db.insert(UserAnswer).values({
      mockIDRef: mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
      createdAt
    });
    return { success: true };
  } catch (error) {
    console.error('DB Insert Error:', error);
    return { success: false, error: String(error) };
  }
};
