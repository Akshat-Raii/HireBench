'use server'
import { db } from './db';
import { UserAnswer } from './schema';
import { eq } from 'drizzle-orm';

export async function getFeedbackByMockId(mockId: string) {
  return await db
    .select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIDRef, mockId))
    .orderBy(UserAnswer.id);
}
