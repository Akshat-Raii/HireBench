"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { main } from "@/utils/aimodel";
import { saveMockInterview } from "@/app/actions/saveInterview";
import { useUser } from "@clerk/nextjs";
import { log } from "node:console";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState(0);
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const router=useRouter();
  const { user } = useUser();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `
    
      Generate 10 interview questions for:
      - Job Position: ${jobPosition}
      - Job Description: ${jobDesc}
      - Years of Experience: ${jobExperience}
      Along with their correct answers.
      Output in JSON: [{"question": "...", "answer": "..."}, ...]
      Do NOT wrap in markdown.
    `;

    try {
      let result = await main(prompt);

      result = result.replace('```json','').replace('```','')
      const parsed = JSON.parse(result);

      console.log(parsed);
      

      const saveRes = await saveMockInterview({
        jobPosition,
        jobDesc,
        jobExperience,
        jsonMockResp: result,
        email: user?.primaryEmailAddress?.emailAddress || "anonymous",
      });

      if (saveRes.success) {
        console.log("Saved with ID:", saveRes.mockId);
      } else {
        alert("Failed to save interview to DB.");
      }
      if(saveRes.success){
        setOpenDialog(false);
        router.push('/dashboard/interview/'+saveRes.mockId);
      }
    } catch (err) {
      console.error("Error generating or saving:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg hover:scale-105 hover:shadow-md cursor-pointer transitions-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your Job Interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add job details below</h2>
                  <div className="mt-7 my-3">
                    <label>Job Role</label>
                    <Input
                      placeholder="Ex. SDE II / FullStack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description</label>
                    <Textarea
                      placeholder="Ex. DSA, ML, React"
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                      onChange={(e) =>
                        setJobExperience(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
