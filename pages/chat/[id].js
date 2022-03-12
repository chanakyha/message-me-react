import Head from "next/head";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import {
  doc,
  db,
  collection,
  query,
  getDocs,
  orderBy,
  serverTimestamp,
  getDoc,
  auth,
} from "../../firebase";
import getRecientEmail from "../../utils/getRecipientEmail";

const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <Constainer>
      <Head>
        <title>Chat with {getRecientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Constainer>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = collection(db, "chats", context.query.id, "messages");
  const messagesRef = await getDocs(query(ref, orderBy("Timestamp", "asc")));

  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: serverTimestamp().toDate().getTime(),
    }));

  const chatRes = await getDoc(doc(db, "chats", context.query.id));
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  console.log(chat, messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Constainer = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
