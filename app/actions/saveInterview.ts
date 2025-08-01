"use server";

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export async function saveMockInterview({
  jobPosition,
  jobDesc,
  jobExperience,
  jsonMockResp,
  email,
}: {
  jobPosition: string;
  jobDesc: string;
  jobExperience: number;
  jsonMockResp: string;
  email: string;
}) {
  try {
    const response = await db
      .insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: email,
        createdAt: moment().format("DD-MM-YYYY"),
        jsonMockResp,
      })
      .returning({ mockId: MockInterview.mockId });

    return { success: true, mockId: response[0].mockId };
  } catch (err) {
    console.error("DB Error:", err);
    return { success: false, error: "DB insert failed" };
  }
}
