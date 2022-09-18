import React, { useEffect, useState } from "react";
import axios from "axios";
const ChatPage = () => {
  const [chats, setChats] = useState({});
  const fetchChat = async () => {
    const data = await axios.get("/api/user");

    setChats(data);
  };
  useEffect(() => {
    fetchChat();
  }, []);
  console.warn(chats);
  return (
    <div>
      <h1>Chat page</h1>
    </div>
  );
};

export default ChatPage;
