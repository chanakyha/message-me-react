import Head from "next/head";
import React from "react";
import styled from "styled-components";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { doc, db, collection, query, getDocs, orderBy } from "../../firebase";
const Chat = () => {
  return (
    <Constainer>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Constainer>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = collection(db, "chats", context.query.id, "messages");
  const messagesRef = await getDocs(query(ref, orderBy("Timestamp", "asc")));

  //   const messages = messagesRef.docs.map(doc =)
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
