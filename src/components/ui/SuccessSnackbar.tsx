import { Alert, Snackbar } from "@mui/material";
interface ISuccessSnackbar {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SuccessSnackbar = ({ open, setOpen }: ISuccessSnackbar) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ width: "80%" }}
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        Dish added successfully!
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
