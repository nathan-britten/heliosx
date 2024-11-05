import { Consultation } from "./pages/consultation";
import styled from "styled-components";
import { Footer } from "./components/footer/footer";
import { NavBar } from "./components/navbar/navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function App() {
  return (
    <Wrapper>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="consultation/:questionId" element={<Consultation />} />
        <Route
          path="thank-you"
          element={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h3">Thank You</Typography>
            </Box>
          }
        />
      </Routes>
      <Footer />
    </Wrapper>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Button
        onClick={() => navigate("/consultation/1")}
        color="primary"
        variant="contained"
      >
        Start Consultation
      </Button>
    </Box>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default App;
