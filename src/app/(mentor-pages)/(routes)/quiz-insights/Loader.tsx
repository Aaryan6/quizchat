import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingPage() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
    </div>
  );
}
