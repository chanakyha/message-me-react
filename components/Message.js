import React from "react";
import styled from "styled-components";

const Message = ({ user, message }) => {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};

export default Message;

const Container = styled.div``;
