import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import {
  signOut,
  auth,
  collection,
  addDoc,
  db,
  query,
  where,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import { Circle } from "better-react-spinkit";
const Sidebar = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  if (user) {
    const userChatRef = query(
      collection(db, "chats"),
      where("users", "array-contains", user?.email)
    );
  }
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please Enter an Email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      const docRef = addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const onSignOut = () => {
    signOut(auth).catch(alert);
    router.push("/");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const Open3Dot = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const Close3dot = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} />
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon onClick={Open3Dot} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={Close3dot}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={Close3dot}>Profile</MenuItem>
              <MenuItem onClick={onSignOut}>Logout</MenuItem>
            </Menu>
          </IconButton>
        </IconContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>Start a New Chat</SidebarButton>

      {chatsSnapshot?.docs ? (
        chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))
      ) : (
        <LoadingContainer>
          <Circle color="#000" size={60} />
        </LoadingContainer>
      )}
    </Container>
  );
};

export default Sidebar;

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 15em;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
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
  padding: 10px;
  height: 50px;
  border-bottom: 1px solid whitesmoke;
`;
const IconContainer = styled.div``;
const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
