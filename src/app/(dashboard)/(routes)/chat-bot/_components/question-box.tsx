"use client";

export default function QuestionBox({
  question,
  questionIndex,
}: {
  question: string;
  questionIndex: number;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F9F4EC] text-[#5B8989] bg-[#F9F4EC] p-4 rounded-lg rounded-ss-none">
      <p className="text-sm py-0.5">{question}</p>
    </div>
  );
}
