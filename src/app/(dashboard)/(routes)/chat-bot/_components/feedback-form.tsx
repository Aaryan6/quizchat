"use client";

import { cn } from "@/lib/utils";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import FeedBackPopup from "./feedback-popup";

type FeedbackProps = {
  answer: string;
  answerId: string;
  chat_id: string;
  user_id: string;
};

export default function FeedBackForm({
  answer,
  answerId,
  chat_id,
  user_id,
}: FeedbackProps) {
  const [response, setResponse] = useState<"good" | "bad" | null>(null);
  const [feedbackDone, setFeedbackDone] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const showOptions = response === "bad" || response === "good";

  if (feedbackDone) return;
  return (
    <div className="px-10 py-2 space-y-2">
      <div className="flex gap-x-2 items-center">
        <ThumbsUp
          onClick={() => {
            setResponse("good");
            handleClickOpen();
          }}
          className={cn(
            "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer",
            response === "good" && "fill-slate-300"
          )}
        />
        <ThumbsDown
          onClick={() => {
            setResponse("bad");
            handleClickOpen();
          }}
          className={cn(
            "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer",
            response === "bad" && "fill-slate-300"
          )}
        />
      </div>
      {open && (
        <FeedBackPopup
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          showOptions={showOptions}
          response={response!}
          setFeedbackDone={setFeedbackDone}
          chat_id={chat_id}
          user_id={user_id}
          answer={answer}
          answerId={answerId}
        />
      )}
    </div>
  );
}
