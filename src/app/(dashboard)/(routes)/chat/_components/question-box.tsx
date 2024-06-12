"use client";

export default function QuestionBox({
  question,
  questionIndex,
}: {
  question: string;
  questionIndex: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#DAE7E7] text-[#5B8989] bg-[#F9FBFB] p-4 rounded-lg rounded-ss-none">
      <span className="font-semibold">Question {questionIndex}:</span>
      <p className="text-sm py-0.5">{question}</p>
    </div>
  );
}
