import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import TeaData from "./components/Teas/TeaData";
import GettinTea from "./components/GetTea/GettinTea";
import {
  Box,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddTea from "./components/Teas/AddTea";

function App() {
  const [createdNewTea, setCreatedNewTea] = useState({});
  const checkCreatedNewTea = (teaResponse) => {
    setCreatedNewTea(teaResponse);
  };
  return (
    <>
      <Navbar></Navbar>

      <Box
        sx={{
          minWidth: 215,
          display: "flex",
          direction: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "13px",
        }}
        flexDirection={"column"}
      >
        <Accordion
          sx={{
            minWidth: 215,
            width: 600,
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            margin: "10px",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography align='center'>Forms</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddTea onCheckCreatedNewTea={checkCreatedNewTea}></AddTea>
          </AccordionDetails>
        </Accordion>

        <TeaData
          loadNewTea={createdNewTea}
          style={{ width: "600px" }}
        ></TeaData>
      </Box>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
