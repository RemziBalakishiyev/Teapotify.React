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
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddTea from "./components/Teas/AddTea";
import Login from "./components/Authentication/Login";
import { LoginContext } from "./context/LoginContext";

function App() {
  const [createdNewTea, setCreatedNewTea] = useState({});
  const [OnLogin, setOnLogin] = useState(false);

  console.log(OnLogin);
  const checkCreatedNewTea = (teaResponse) => {
    setCreatedNewTea(teaResponse);
  };
  return (
    <>
      <Navbar></Navbar>
      <LoginContext.Provider value={{ setOnLogin }}>
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
          {OnLogin ? (
            <Box>
              <Accordion sx={{ margin: 5 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>Tea potify form</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Card
                    sx={{
                      minWidth: 215,
                      width: 800,
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 13,
                      margin: "10px",
                    }}
                  >
                    <AddTea onCheckCreatedNewTea={checkCreatedNewTea}></AddTea>
                  </Card>
                </AccordionDetails>
              </Accordion>
              <TeaData
                loadNewTea={createdNewTea}
                style={{ width: "600px" }}
              ></TeaData>
            </Box>
          ) : (
            <Card
              sx={{
                minWidth: 300,
                width: 500,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 13,
                margin: "10px",
              }}
            >
              <Login />
            </Card>
          )}
        </Box>
      </LoginContext.Provider>
    </>
  );
}

export default App;
