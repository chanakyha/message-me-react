import styled from "styled-components";
import Head from "next/head";
import React from "react";
import { Button } from "@material-ui/core";
import { auth, signInWithPopup, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src="https://i.ibb.co/wwNZ5Lk/logo.jpg" />
        <LoginButton onClick={signIn}>Sign in with Google</LoginButton>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background-color: whitesmoke;
  display: grid;
  place-items: center;
  height: 100vh;
`;
const LoginContainer = styled.div`
  padding: 100px;
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.1);
`;
const Logo = styled.img`
  border-radius: 1em;
  width: 200px;
  margin-bottom: 50px;
`;

const LoginButton = styled(Button)`
  &&& {
    border: 1px solid whitesmoke;
  }
`;
