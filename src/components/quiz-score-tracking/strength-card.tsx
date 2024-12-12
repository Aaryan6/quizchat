import React from "react";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import starIcon from "@/assets/Images/starIcon.svg";

import "@/components/home-page.css";

type Props = {
  strength: {
    topic: string;
    totalScore: number;
  };
};

const StrengthCard = ({ strength }: Props) => {
  return (
    <Card className="flex justify-between p-4 bg-[#FFFFFF]">
      <div className="text-xs font-semibold  flex justify-center items-center text-left text-[#5B8989]">
        {strength.topic}
      </div>
      <div className="flex justify-center items-center text-left">
        <span className="text-sm font-semibold  text-[#5B8989]">{strength.totalScore}</span>
        <Image src={starIcon} alt="star" />
      </div>
    </Card>
  );
};

export default StrengthCard;
