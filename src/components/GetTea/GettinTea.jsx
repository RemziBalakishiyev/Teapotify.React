import React, { useCallback, useState, memo } from "react";
import { Card, CardContent, Button, Stack, Typography } from "@mui/material";
import "./GettinTea.css";
import TeaConten from "./TeaConten";

const GettinTea = () => {
  const onHandleEnable = () => {
    const a = useOnlineStatus();
    console.log(a);
  };

  return (
    <Stack sx={{ width: 500 }} useFlexGap>
      <Card sx={{ minWidth: 275 }}>
        <CardContent className='content'>
          <Typography></Typography>
          <Button color='primary' variant='contained' onClick={onHandleEnable}>
            Get Tea
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default GettinTea;
