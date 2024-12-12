import userIcon from "@/assets/Images/user_icon.png";
import Image from "next/image";

type UserMessageProps = {
  message: string;
};
export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex-1 relative w-full">
      <div className="flex w-full justify-start gap-x-2">
        <div className="bg-white border border-orange-200 w-10 h-10 rounded-full grid place-items-center">
          <Image src={userIcon} alt="user" className="stroke-white" />
        </div>
        <div
          className={
            "w-fit grid grid-cols-1 gap-2 border-2 font-medium text-sm leading-5 border-[#F9F4EC] text-[#5B8989] bg-[#F9F4EC] p-4 rounded-lg rounded-ss-none whitespace-pre-wrap"
          }
        >
          {message}
        </div>
      </div>
    </div>
  );
};
