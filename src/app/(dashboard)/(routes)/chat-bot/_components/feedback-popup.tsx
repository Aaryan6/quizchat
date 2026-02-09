import * as React from "react";
import { Button } from "@/components/ui/button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Input } from "@/components/ui/input";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { addFeedback } from "@/actions/chat-doubt";

type Props = {
  open: boolean;
  handleClickOpen: (open: boolean) => void;
  handleClose: any;
  showOptions: boolean;
  response: string;
  setFeedbackDone: (feedbackDone: boolean) => void;
  chat_id: string;
  user_id: string;
  answer: string;
  answerId: string;
};

export default function FeedBackPopup({
  open,
  handleClickOpen,
  handleClose,
  showOptions,
  response,
  setFeedbackDone,
  chat_id,
  user_id,
  answer,
  answerId,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [loader, setLoader] = React.useState<boolean>(false);
  const [userInput, setUserInput] = React.useState<string>("");

  const submitFeedback = async () => {
    setLoader(true);
    await addFeedback(user_id, chat_id, response, {
      answerId,
      ai_answer: answer,
      reason: userInput,
    });
    setFeedbackDone(true);
    setLoader(false);
  };
  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"sm"}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="inline-flex">
            <div>
              {response === "good" ? (
                <ThumbsUp
                  className={cn(
                    "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer mt-1.5",
                    "fill-slate-300"
                  )}
                />
              ) : (
                <ThumbsDown
                  className={cn(
                    "stroke-slate-500 w-4 h-4 hover:fill-slate-300 cursor-pointer mt-1.5",
                    "fill-slate-300"
                  )}
                />
              )}
            </div>
            <span className="ml-2 font-semibold text-lg text-[#2F4F4F]">
              {response === "good"
                ? "Why did you like this?"
                : "Tell us what went wrong"}
            </span>
          </div>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Enter your feedback"
              className="w-[80%] "
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full flex justify-center mt-[1rem] mb-[1rem]">
            <Button
              className="min-w-44 ml-2 w-max px-8 py-4 bg-[#E98451] text-sm font-semibold text-[#FFF] hover:bg-[#E98451]"
              onClick={() => submitFeedback()}
              disabled={loader}
            >
              {loader ? (
                <CircularProgress color="inherit" size={25} />
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
