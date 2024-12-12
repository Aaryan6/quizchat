import React, { useEffect, useState } from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Link from "next/link";
type chatData = {
  id: string;
  user_id: string;
  payload: {
    id: string;
    path: string;
    title: string;
    user_id: string;
  };
};
type Props = {
  recentChats: chatData[];
};

const LastInteractions = ({ recentChats }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading indicator
  }
  return (
    <div>
      <div className="flex items-center mb-[1rem]">
        <AccessTimeOutlinedIcon fontSize="small" className="text-[#FFC31F]" />{" "}
        <span className="text-[#2F4F4F] text-sm font-medium ml-[5px]">
          Last interactions with Noah
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {recentChats.map((data, index) => {
          return (
            <Link
              href={data.payload.path}
              key={index}
              className="bg-[#F0F6FA] p-[12px] flex justify-between rounded-lg"
            >
              <span className="text-[#5B8989] text-sm font-medium">
                {data.payload.title.length > 100
                  ? `${data.payload.title.slice(1, 100)}...`
                  : data.payload.title}
              </span>
              <ArrowForwardOutlinedIcon
                fontSize="small"
                className="text-[#5B8989]"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LastInteractions;
