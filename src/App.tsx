import { CssBaseline, Box } from "@mui/material";
import { DishForm } from "./components/Form/";

function App() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",

          bgcolor: "primary.main",
        }}
      >
        <DishForm />
      </Box>
    </>
  );
}

export default App;
