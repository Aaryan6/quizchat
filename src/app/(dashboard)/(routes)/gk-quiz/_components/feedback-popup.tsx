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
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

export default function FeedBackPopup({
  open,
  handleClickOpen,
  handleClose,
  showOptions,
  reasons,
  handleReason,
  responses,
  loader,
}: {
  open: boolean;
  handleClickOpen: (open: boolean) => void;
  handleClose: any;
  showOptions: boolean;
  reasons: Array<{ id: number; text: string }>;
  handleReason: any;
  responses: string | null;
  loader: boolean;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [reasonId, setReasonId] = React.useState<number | null>(null);
  return (
    <React.Fragment>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={"sm"}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <div className="inline-flex">
            <div>
              {responses === "good" ? (
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
              {responses === "good"
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
        <DialogContent dividers>
          <div className="grid grid-cols-1 gap-2">
            {showOptions &&
              reasons.map((reason: any, i: number) => (
                <React.Fragment>
                  {reason.text && (
                    <div
                      key={reason.id}
                      className={cn(
                        "py-1 px-4 rounded-md bg-white border hover:bg-slate-50 cursor-pointer text-[#5B8989]",
                        i + 1 === reasonId &&
                          "bg-[#5B8989] text-[#FFF] hover:bg-[#5B8989]"
                      )}
                      onClick={() => setReasonId(reason.id)}
                    >
                      <span className="text-sm font-medium">{reason.text}</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </DialogContent>
        <DialogActions>
          <div className="w-full flex justify-left mt-[1rem] mb-[1rem]">
            <Button
              className="min-w-44 ml-2 w-max px-8 py-4 bg-[#E98451] text-sm font-semibold text-[#FFF] hover:bg-[#E98451]"
              onClick={() => handleReason(reasonId)}
              disabled={!reasonId || loader}
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
