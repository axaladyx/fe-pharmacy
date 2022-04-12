import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import axios from "../../utils/axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { TextField, Typography } from "@mui/material";
import { loginAction } from "../../store/actions";

function ForgotPassword() {
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onResetClick = async () => {
    try {
      const res = await axios.post("/users/login", {
        email: formState.email,
      });

      const user = res.data.user[0];

      const action = loginAction(user);

      console.log(res.data.user[0]);
      dispatch(action);
    } catch (error) {
      console.log({ error });
    }
  };

  const onInputPress = (e) => {
    if (e.code === "Enter") onResetClick();
  };

  if (username) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container
      sx={{
        width: 500,
        height: 300,
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 6,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 25,
          paddingTop: 4,
          marginBottom: 2,
        }}
      >
        Bodrugs
      </Typography>
      <Container
        sx={{
          width: 350,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          backgroundColor: "white",
          paddingTop: 1,
        }}
      >
        <TextField
          placeholder="Enter your e-mail"
          variant="outlined"
          name="email"
          type="email"
          onChange={handleChange}
          onKeyPress={onInputPress}
          sx={{
            p: 1,
            m: 1,
            width: "100%",
          }}
        />
        <Container
          sx={{
            marginTop: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Container
            sx={{
              marginBottom: 2,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "end",
            }}
          ></Container>
          <Button
            variant="contained"
            color="primary"
            onClick={onResetClick}
            sx={{
              width: "100%",
              paddingInline: 17,
            }}
          >
            Reset
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default ForgotPassword;
