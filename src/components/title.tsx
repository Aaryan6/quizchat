"use client";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#3D3D3D",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "21.09px",
    display: "flex",
    justifyContent: "center",
    margin: "24px 0px",
  },
}));

const Title = ({ studentName }: any) => {
  const classes = useStyles();
  return (
    <div className={classes.title}>
      {`Quiz Insights Report - ${studentName}`}
    </div>
  );
};

export default Title;
