import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import TeaData from "./components/Teas/TeaData";
import GettinTea from "./components/GetTea/GettinTea";
import { Box, Card } from "@mui/material";
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
        <Card
          sx={{
            minWidth: 215,
            width: 600,
            justifyContent: "center",
            alignItems: "center",
            padding: 13,
            margin: "10px",
          }}
        >
          <AddTea onCheckCreatedNewTea={checkCreatedNewTea}></AddTea>
        </Card>
        <TeaData
          loadNewTea={createdNewTea}
          style={{ width: "600px" }}
        ></TeaData>
      </Box>
    </>
  );
}

export default App;
