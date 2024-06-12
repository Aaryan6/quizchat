"use client";
import React from "react";
import { makeStyles } from "@mui/styles";
import Tick from "@/assets/Images/tick.svg";
import Cross from "@/assets/Images/wrong.svg";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import LoadingPage from "../Loader";

const useStyles = makeStyles(() => ({
  container: {
    background: "#FFFFFF",
    padding: "16px 24px",
    borderRadius: "8px",
    border: "1px solid #FDECD9",
    height: "380px",
    minWidth: "560px",
  },
  title: {
    color: "#3D3D3D",
    fontSize: "16px",
    lineHeight: "18.71px",
    fontWeight: "600",
  },
  addMargin: {
    marginTop: "16px",
  },

  scrollContainer: {
    marginTop: "20px",
    maxHeight: "314px",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#EAECEC",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#D3D9D9",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#D3D9D9",
    },
  },
  quizListWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rootSelect: {
    display: "flex",
    alignItems: "center",
    borderRadius: 4,
    border: "1px solid #C4C4C4",
    padding: "2px 8px",
  },
  select: {
    flex: 1,
    "& .MuiNativeSelect-select": {
      fontSize: "14px",
      lineHeight: "16.41px",
      color: "#3D3D3D",
      fontWeight: "400",
    },
    "& .MuiInputBase-input": {
      backgroundColor: "#fff",
    },
  },
  questionContainer: {
    marginRight: "20px",
  },
  questionWrapper: {
    border: "1px solid #DAE7E7",
    background: "#F9FBFB",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  },
  question: {
    color: "#7A7A7A",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "16.94px",
    maxWidth: "80%",
  },
  answersContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  answerWrapper: {
    border: "1px solid #DAE7E7",
    padding: "8px 16px",
    borderRadius: "4px",
    flex: "1 1 0",
    display: "flex",
    alignItems: "center",
  },
  answer: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "16.94px",
    marginLeft: "20px",
  },
  options: {
    textTransform: "capitalize",
    background: "#E6EFEF",
    borderRadius: "35px",
    color: "#7A7A7A",
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "14px",
    height: "24px",
    width: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "24px",
    height: "24px",
  },
}));

interface Props {
  quizScores: any;
  incorrectAns: any;
  quizId: string;
  handleSelect: any;
  isAnswersLoading: any;
}

const WrongAnswers = ({
  quizScores,
  incorrectAns,
  quizId,
  handleSelect,
  isAnswersLoading,
}: Props) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    handleSelect(event.target.value);
  };
  return (
    <div className={classes.container}>
      <div className={classes.quizListWrapper}>
        <div className={classes.title}>Wrong Answers Review</div>
        {!isAnswersLoading && (
          <div className={classes.rootSelect}>
            <NativeSelect
              className={classes.select}
              disableUnderline
              defaultValue={quizId}
              onChange={handleChange}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              {quizScores.map((option: any, index: number) => (
                <option key={option.quizId} value={option.quizId}>
                  {`Quiz ${option.quizNo}`}
                </option>
              ))}
            </NativeSelect>
          </div>
        )}
      </div>
      {isAnswersLoading ? (
        <LoadingPage />
      ) : (
        <div className={classes.scrollContainer}>
          <div className={classes.questionContainer}>
            {incorrectAns.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`${classes.questionWrapper} ${
                    index !== 0 && classes.addMargin
                  }`}
                >
                  <div className={classes.question}>{item.question}</div>
                  <div className={classes.answersContainer}>
                    {item.options.map((answer: any, index: number) => {
                      return (
                        <div
                          className={classes.answerWrapper}
                          style={{
                            background: answer.correct
                              ? "#7EC8A6"
                              : answer.wrong
                              ? "#EEA195"
                              : "#F9FBFB",
                          }}
                        >
                          <div>
                            {answer.correct ? (
                              <Image
                                src={Tick}
                                alt="tick"
                                className={classes.img}
                              />
                            ) : answer.wrong ? (
                              <Image
                                src={Cross}
                                alt="wrong"
                                className={classes.img}
                              />
                            ) : (
                              <div className={classes.options}>
                                {`${String.fromCharCode(97 + index)}`}
                              </div>
                            )}
                          </div>
                          <div
                            className={classes.answer}
                            style={{
                              color:
                                answer.correct || answer.wrong
                                  ? "#FFFFFF"
                                  : "#7A7A7A",
                            }}
                          >
                            {answer.text}{" "}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WrongAnswers;
