import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Test from "./components/Test";
import { Exercise } from "./routes/exercise";
import Exercises from "./routes/exercises";
import Login from "./routes/login";
import Register from "./routes/register";

export default function Router() {
  return (
    <Box sx={{ m: 3 }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="exercises" element={<Exercises />} />
        <Route path="exercises/:id" element={<Exercise />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}