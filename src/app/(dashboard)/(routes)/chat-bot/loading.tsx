"use client";
import noahSmallIcon from "@/assets/Images/noahSmallIcon.png";
import ion_send_white from "@/assets/Images/ion_send_white.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";

export default function Loading() {
  const [randomFact, setRandomFact] = useState("");

  useEffect(() => {
    // Set a random fact when the component mounts
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
  }, []);
  return (
    <div className="flex flex-col justify-center content-center items-center p-5">
      <div className="flex justify-between content-center items-center">
        <Image src={noahSmallIcon} alt="noah" className="h-[54px] w-[54px]" />
        <div className="ml-4 w-full text-2xl md:text-4xl text-[#2F4F4F] font-extrabold">
          Lets <span className="headerClrTxt">smash doubts</span> together!
        </div>
      </div>
      <div className="text-[#5B8989] text-lg font-medium mt-6">
        What would you like to discuss about today?
      </div>
      <div className="w-full mt-8 md:max-w-3xl">
        <div className="bg-white h-[4rem] md:px-4 flex items-center justify-center gap-x-2 w-full">
          <div className="animate-pulse w-full p-1 rounded-lg flex bg-[#FFF] border-2 border-[#95B2B2]">
            <Input
              type="text"
              placeholder="Ask something..."
              className="cursor-progress w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0"
              value={""}
              onChange={(e) => {}}
            />
            <Button
              type="submit"
              className="border-0 py-[4px]  text-sm fomt-semibold text-[#FFF] bg-[#E98451] hover:bg-[#E98451]"
            >
              <span className="hidden sm:block">Start Chat</span>
              <Image src={ion_send_white} alt="" className="sm:ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-col justify-around border-2 border-[#E4E2DC] bg-[#F6F5F4] p-6 mt-[3rem] rounded-lg">
        <div className="text-center text-sm font-bold text-[#2F4F4F]">
          Do you know?
        </div>
        <div className="w-full text-center text-sm font-medium text-[#5B8989] mt-3 md:max-w-lg">
          {randomFact}
        </div>
      </div>
      <div className="w-full md:max-w-3xl mt-[3rem]">
        <div className="flex items-center mb-[1rem]">
          <AccessTimeOutlinedIcon fontSize="small" className="text-[#FFC31F]" />{" "}
          <span className="text-[#2F4F4F] text-sm font-medium ml-[5px]">
            Last interactions with Noah
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
          {[1, 2, 3].map((data, index) => {
            return (
              <div
                key={index}
                className="bg-[#F0F6FA] p-[12px] flex justify-between rounded-lg animate-pulse"
              >
                <p className="text-[#5B8989] text-sm font-medium py-2 w-full"></p>
                <ArrowForwardOutlinedIcon
                  fontSize="small"
                  className="text-[#5B8989]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const facts = [
  "A single strand of human hair can support up to 100 grams in weight.",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
  "The average person spends about six months of their life waiting for red lights to turn green.",
  "A single drop of seawater contains thousands of different types of bacteria.",
  "Lightning is five times hotter than the surface of the sun.",
  "The blue whale, the largest animal on Earth, has a heart the size of a small car.",
  "The human body contains about 0.2 milligrams of gold, most of which is in our blood.",
  "The average person's skin completely renews itself about every 27 days.",
  "An octopus has three hearts and blue blood because its blood is copper-based rather than iron-based like ours.",
  "The DNA in your body, if uncoiled, would stretch about 10 billion miles, from Earth to Pluto and back.",
  "The human eye is capable of distinguishing about 10 million different colors.",
  "While seeing a bright sky and if you see white dots, those are white blood cells that you see.",
  "Fingernails grow faster when our body is cold.",
  "Dogs’ hearing capacity is 10 times better and can smell 100,000 times better than humans.",
  "The Egyptians were using a form of toothpaste over 5000 years ago, made from crushed eggshells and animal hooves.",
  "Saturn’s rings are mostly composed of ice particles with a smaller amount of rocky debris and dust.",
  "The shortest complete sentence in the English language is I am.",
  "The concept of zero as a number was first developed in ancient India by mathematicians around the 5th century.",
  "There are more atoms in a single glass of water than glasses of water in all the oceans on Earth.",
  "The human eye can distinguish about 10 million different colors.",
  "Every hour, the universe expands by a billion miles in all directions.",
  "Venus is the only planet that rotates clockwise.",
  "Humans are born with 300 bones, but by adulthood, we only have 206, as some bones fuse together over time.",
  "Your stomach lining replaces itself every three to four days to avoid digesting itself.",
  "Your ears and nose continue growing throughout your entire life.",
  "The tongue of a blue whale can weigh as much as an elephant.",
];
