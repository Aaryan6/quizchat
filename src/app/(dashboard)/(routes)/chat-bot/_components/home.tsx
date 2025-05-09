"use client";

import React from "react";
import { FormEvent, useEffect, useState } from "react";
import noahSmallIcon from "@/assets/Images/noahSmallIcon.png";
import botIcon from "@/assets/Images/noah_dp.svg";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import ion_send_white from "@/assets/Images/ion_send_white.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./home.css";
import { nanoid } from "@/lib/utils";
import { useRouter } from "next/navigation";
import LastInteractions from "./last-interactions";
import { useActions, useAIState, useUIState } from "ai/rsc";
import { AI } from "@/actions/chat/chat-stream";
import { UserMessage } from "./user-message";
import { CircularProgress } from "@mui/material";

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
  user_Id: string;
  recentChats: chatData[] | null;
};

const Home = ({ user_Id, recentChats }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const [randomFact, setRandomFact] = useState("");
  const [_, setMessages] = useUIState<typeof AI>();
  const { submit } = useActions();
  const [aiState, setAIState] = useAIState<typeof AI>();
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleUserInput = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (inputValue === "") {
        toast({ title: "Enter the Question", duration: 3000 });
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: nanoid(),
          display: <UserMessage message={inputValue} />,
        },
      ]);

      const res = await submit(inputValue, aiState.chatId);

      setMessages((currentMessages) => [...currentMessages, res as any]);

      setShowChat(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (aiState.messages.length && showChat) {
      setInputValue("");
      setLoading(false);
      router.push(`/chat-bot/${user_Id}/${aiState.chatId}`);
    }
  }, [aiState.messages]);

  useEffect(() => {
    setAIState({
      chatId: nanoid(),
      messages: [],
    });
    setMessages([]);

    // Set a random fact when the component mounts
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);

    // Update the random fact every 5 seconds
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * facts.length);
      setRandomFact(facts[newIndex]);
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

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

  return (
    <div
      className="flex flex-col justify-center content-center items-center"
      style={{
        marginTop: recentChats && recentChats.length > 0 ? "0" : "8rem",
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center">
        <Image src={botIcon} alt="noah" className="h-[54px] w-[54px]" />
        <div className="ml-4 w-full text-2xl md:text-4xl text-[#2F4F4F] font-extrabold">
          Lets <span className="headerClrTxt">smash doubts</span> together!
        </div>
      </div>
      <div className="text-[#5B8989] text-base md:text-lg font-medium mt-6 text-center">
        What would you like to discuss about today?
      </div>
      <div className="w-full mt-8 md:max-w-3xl">
        <form
          onSubmit={handleUserInput}
          className="bg-white h-[4rem] md:px-4 flex items-center justify-center gap-x-2 w-full"
        >
          <div className="w-full p-1 rounded-lg flex bg-[#FFF] border-2 border-[#95B2B2]">
            <Input
              type="text"
              placeholder="Ask something..."
              className="w-full border-0 focus-visible:outline-none focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="border-0 py-[4px]  text-sm fomt-semibold text-[#FFF] bg-[#E98451] hover:bg-[#E98451]"
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <div className="flex items-center pr-4">
                  <span className="hidden sm:block">Start Chat</span>
                  <Image src={ion_send_white} alt="" className="sm:ml-2" />
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex-col justify-around border-2 border-[#E4E2DC] bg-[#F6F5F4] p-6 mt-[3rem] rounded-lg">
        <div className="text-center text-sm font-bold text-[#2F4F4F]">
          Do you know?
        </div>
        <div className="w-full text-center text-sm font-medium text-[#5B8989] mt-3 md:max-w-lg">
          {randomFact}
        </div>
      </div>
      {recentChats && recentChats.length > 0 && (
        <div className="w-full md:max-w-3xl mt-[3rem]">
          <LastInteractions recentChats={recentChats} />
        </div>
      )}
    </div>
  );
};

export default Home;
