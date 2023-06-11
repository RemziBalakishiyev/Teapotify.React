import { useState, useContext } from "react";
import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import { LoginContext } from "../../context/LoginContext";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const { setOnLogin } = useContext(LoginContext);

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordHandler = (e) => {
    setpassword(e.target.value);
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (userName == "remzi" && password == "123") {
      setOnLogin(true);
    }
  };
  return (
    <form onSubmit={onLogin}>
      <Stack
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
        direction={"column"}
      >
        <TextField
          label='Username'
          type='text'
          variant='outlined'
          onChange={userNameHandler}
        />
        <TextField
          label='Password'
          type='text'
          variant='outlined'
          onChange={passwordHandler}
        />
        <Button variant='contained' color='secondary' type='submit'>
          Add new tea
        </Button>
      </Stack>
    </form>
  );
}

export default Login;
