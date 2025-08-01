'use server';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function getInterviewById(interviewId: string) {
  const result = await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.mockId, interviewId));

  return result;
}
