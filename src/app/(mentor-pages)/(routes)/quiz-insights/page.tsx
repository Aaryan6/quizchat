"use client";
import React, { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import Title from "@/components/title";
import AccuracyScores from "./_components/AccuracyScores";
import QuizScores from "./_components/QuizScores";
import WrongAnswers from "./_components/WrongAnswers";
import { getCookie } from "cookies-next";
import { getQuizDetails } from "@/lib/quiz-insights/apiCLient";
import styles from "./quiz-insights.module.css";

const QuizInsights = () => {
  const [quizScores, setQuizScores] = useState([]);
  const [incorrectAns, setIncorrectAns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quizId, setQuizId] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [isGraphLoading, setIsGraphLoading] = useState(false);
  const [isAnswersLoading, setIsAnswersLoading] = useState(false);
  const [userId, setUserId] = useState<any>(null);
  const [mentorId, setMentorId] = useState<any>(null);
  const [userName, setUserName] = useState<any>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const mentorId = getCookie("mentorId");
    const userId = getCookie("userId");
    const userName = getCookie("userName");

    setUserId(userId);
    setMentorId(mentorId);
    setUserName(userName);
    const fetchData = async () => {
      setIsGraphLoading(true);
      setIsAnswersLoading(true);
      try {
        if (mentorId && userId) {
          const data = await getQuizDetails(mentorId, userId, currentPage);
          setIsGraphLoading(false);
          if (data && data?.quizScores.length > 0) {
            setQuizScores(data?.quizScores);
            if (data?.totalCount) {
              setTotalCount(data?.totalCount);
            }
            const quizId = data?.quizScores[0].quizId;
            setQuizId(quizId);
            const response = await getQuizDetails(
              mentorId,
              userId,
              currentPage,
              quizId
            );
            setIsAnswersLoading(false);
            if (response && response?.incorrectAns.length > 0) {
              setIncorrectAns(response?.incorrectAns);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        if (mentorId && userId) {
          const data = await getQuizDetails(mentorId, userId, currentPage);
          if (data && data?.quizScores.length > 0) {
            setQuizScores(data?.quizScores);
            if (data?.totalCount) {
              setTotalCount(data?.totalCount);
            }

            const quizId = data?.quizScores[0].quizId;
            setQuizId(quizId);
            const response = await getQuizDetails(
              mentorId,
              userId,
              currentPage,
              quizId
            );
            if (response && response?.incorrectAns.length > 0) {
              setIncorrectAns(response?.incorrectAns);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [currentPage]);

  const onPrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onNextClick = (totalPages: any) => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelect = async (id: any) => {
    try {
      setQuizId(id);
      const response = await getQuizDetails(mentorId, userId, currentPage, id);
      if (
        response &&
        response?.incorrectAns &&
        response?.incorrectAns.length > 0
      ) {
        setIncorrectAns(response?.incorrectAns);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles[`section-container`]}>
        <Title studentName={userName} />
        <div className={styles["scores-container"]}>
          <QuizScores
            quizScores={quizScores}
            currentPage={currentPage}
            onNextClick={onNextClick}
            onPrevClick={onPrevClick}
            itemsPerPage={itemsPerPage}
            totalCount={totalCount}
            isGraphLoading={isGraphLoading}
          />
          <AccuracyScores mentorId={mentorId} userId={userId} />
        </div>
        <Divider className={styles["divider"]} />
        <WrongAnswers
          quizScores={quizScores}
          incorrectAns={incorrectAns}
          quizId={quizId}
          handleSelect={handleSelect}
          isAnswersLoading={isAnswersLoading}
        />
      </div>
    </div>
  );
};

export default QuizInsights;
