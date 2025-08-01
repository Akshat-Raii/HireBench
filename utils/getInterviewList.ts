'use server'
import { db } from './db';
import { MockInterview } from './schema';
import { desc, eq } from 'drizzle-orm';

export async function getInterviewListByEmail(email: string) {
  return await db
    .select()
    .from(MockInterview)
    .where(eq(MockInterview.createdBy, email))
    .orderBy(desc(MockInterview.id));
}
