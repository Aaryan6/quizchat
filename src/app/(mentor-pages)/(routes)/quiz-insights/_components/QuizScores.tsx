"use client";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import styles from "./scores.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoadingPage from "../Loader";

const useStyles = makeStyles(() => ({
  conatiner: {
    background: "#FFFFFF",
    padding: "16px 24px",
    borderRadius: "8px",
    border: "1px solid #FDECD9",
    height: "232px",
    minWidth: "590px",
  },
  quizScoreWrapper: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: "#3D3D3D",
    fontSize: "16px",
    lineHeight: "18.71px",
    fontWeight: "600",
  },
  icons: { fontSize: "18px" },
}));

interface Props {
  quizScores: any;
  currentPage: number;
  onNextClick: any;
  onPrevClick: any;
  itemsPerPage: number;
  totalCount: any;
  isGraphLoading: any;
}

const QuizScores = ({
  quizScores,
  currentPage,
  onNextClick,
  onPrevClick,
  itemsPerPage,
  totalCount,
  isGraphLoading,
}: Props) => {
  const classes = useStyles();
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const maxBarHeight = 108;
  const minBarHeight = 20;
  const maxValue = Math.max(...quizScores.map((item: any) => item.score));
  const scalingFactor =
    maxValue === 0 ? 0 : (maxBarHeight - minBarHeight) / maxValue;

  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick(totalPages);
  };

  return (
    <div className={classes.conatiner}>
      <div
        className={classes.title}
        style={{ marginBottom: !isGraphLoading ? "20px" : "0px" }}
      >
        Quiz Scores
      </div>
      {isGraphLoading ? (
        <LoadingPage />
      ) : (
        <div className={classes.quizScoreWrapper}>
          <IconButton
            aria-label="previous"
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            <ArrowBackIosNewIcon className={classes.icons} />
          </IconButton>
          <div className={styles["custom-bar-graph"]}>
            {quizScores &&
              quizScores.length > 0 &&
              quizScores?.map((item: any, index: number) => (
                <div>
                  <div
                    key={index}
                    className={styles["bar"]}
                    style={{
                      height: `${
                        item.score === 0
                          ? minBarHeight
                          : minBarHeight + item.score * scalingFactor
                      }px`,
                      background:
                        item.score <= 2
                          ? "#EB9284"
                          : item.score <= 7
                          ? "#FFA85D"
                          : "#7EC8A6",
                    }}
                  >
                    <span
                      className={styles["bar-value"]}
                      style={{ color: "#FFF" }}
                    >
                      {item.score}
                    </span>
                  </div>
                  <div
                    style={{
                      color: "#D0CBC8",
                      maxWidth: "30px",
                      overflowWrap: "break-word",
                      textAlign: "center",
                      fontSize: "12px",
                    }}
                  >
                    {`Quiz ${item.quizNo}`}
                  </div>
                </div>
              ))}
          </div>
          <IconButton
            aria-label="next"
            onClick={handleNextClick}
            disabled={currentPage === totalPages - 1}
          >
            <ArrowForwardIosIcon className={classes.icons} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default QuizScores;
