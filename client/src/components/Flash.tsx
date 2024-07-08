import { Alert, Snackbar } from "@mui/material";

type FlashProps = {
  isShow: boolean;
  duration?: number;
};

function Flash({ isShow, duration = 3000 }: FlashProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      autoHideDuration={duration}
    >
      <Alert severity="success">This is a success Alert.</Alert>
    </Snackbar>
  );
}

export default Flash;
