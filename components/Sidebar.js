import { Avatar, Button, IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { signOut, auth } from "../firebase";
const Sidebar = () => {
  const createChat = () => {
    const input = prompt(
      "Please Enter an Email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (EmailValidator.validate(input)) {
      // We need to add the chats into the firebase db
    }
  };

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => signOut(auth).catch(alert)} />
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>Start a New Chat</SidebarButton>

      {/* List of chats */}
    </Container>
  );
};

export default Sidebar;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const IconContainer = styled.div``;
const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
