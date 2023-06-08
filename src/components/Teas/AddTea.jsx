import React, { useEffect, useState, memo } from "react";
import { Stack, TextField, Button } from "@mui/material";
import useHttp from "../../hook/use-http";
import { toast } from "react-toastify";
function AddTea(props) {
  const [enteredteaName, SetTeaName] = useState("");
  const [enteredQuantity, SetQuantity] = useState(0);
  const [enteredPrice, SetPrice] = useState(0);
  const [teaModel, setTeaModel] = useState({});
  const [teaResponse, setTeaResponse] = useState({});

  const { httpRequest: addTeaDataToApi } = useHttp();

  const addNewTea = (e) => {
    e.preventDefault();
    const teaAddedModel = {
      teaName: enteredteaName,
      quantity: enteredQuantity,
      price: enteredPrice,
    };

    setTeaModel(teaAddedModel);
    props.onCheckCreatedNewTea(teaResponse);
  };

  useEffect(() => {
    addTeaDataToApi(
      {
        url: "https://teapotify-6a7aa-default-rtdb.firebaseio.com/teas.json",
        method: "POST",
        body: teaModel,
        headers: {
          "Content-Type": "application/json",
        },
      },
      (data) => {
        setTeaResponse(data);
      }
    );
  }, [teaModel]);

  const teaNameHandler = (e) => {
    SetTeaName(e.target.value);
  };

  const quantityHandler = (e) => {
    SetQuantity(e.target.value);
  };

  const priceHandler = (e) => {
    SetPrice(e.target.value);
  };

  return (
    <form onSubmit={addNewTea}>
      <Stack
        alignContent={"center"}
        justifyContent={"center"}
        spacing={2}
        direction={"column"}
      >
        <TextField
          label='Tea Name'
          type='text'
          variant='outlined'
          onChange={teaNameHandler}
        />
        <TextField
          label='Quantity'
          type='number'
          variant='outlined'
          onChange={quantityHandler}
        />
        <TextField
          label='Price'
          type='number'
          variant='outlined'
          onChange={priceHandler}
        />
        <Button variant='contained' color='secondary' type='submit'>
          Add new tea
        </Button>
      </Stack>
    </form>
  );
}

export default memo(AddTea);
