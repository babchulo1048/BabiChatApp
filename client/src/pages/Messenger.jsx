import React, { useState, useEffect, useRef } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { useUserContext } from "../context/userContext";
import axios from "axios";
import { useCookies } from "react-cookie";
import Conversation from "./Conversation";
import Message from "./Message";
import { IoMdSend } from "react-icons/io";

const Messenger = () => {
  const { UserID, socket } = useUserContext();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentMessages, setCurrentMessages] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [userId, setUserId] = useCookies(["user_Id"]);
  const [newMessage, setNewMessage] = useState(null);
  const { scrollRef } = useRef(null);
  const messageContainerRef = useRef(null);

  const id = userId["user_Id"];

  // useEffect(() => {
  //   scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [currentMessages]);
  useEffect(() => {
    socket.on("getMessages", (data) => {
      console.log("Received new message:", data);
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    console.log("ArrivalMessages:", arrivalMessages);
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setCurrentMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat]);

  useEffect(() => {
    if (socket) {
      socket.emit("adduser", id);
      socket.on("getUsers", (users) => {
        console.log("users:", users);
      });
    }
  }, [socket, id]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `http://localhost:3001/conversation/detail/${id}`
      );
      // console.log("UserID:", UserID);
      // console.log("UserId:", userId["user_Id"]);
      // console.log("conversations:", response.data);

      setConversations(response.data);
    };

    fetchUsers();
  }, [id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (currentChat) {
        // Add null check
        const response = await axios.get(
          `http://localhost:3001/msg/detail/${currentChat._id}`
        );
        // console.log("message:", response.data);
        setCurrentMessages(response.data);
      }
      // setCurrentMessages(response.data)
    };
    fetchMessages();
  }, [currentChat]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const message = {
        conversationId: currentChat._id,
        sender: id,
        text: newMessage,
      };

      console.log("currentCHat: ", currentChat.members);

      let receiverId = currentChat.members.find((member) => member.id !== id);

      console.log("receiverId", receiverId);

      socket.emit("sendMessage", {
        senderId: id,
        receiverId,
        text: newMessage,
      });

      const response = await axios.post(
        "http://localhost:3001/msg/create",
        message
      );
      setCurrentMessages([...currentMessages, response.data]);
      setNewMessage("");
      // setCurrentMessages(response.data);
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleKeyPress = (e) => {
    // Handle Enter key press
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <div className={"grid grid-cols-5 gap-4 h-full bg-blue-200"}>
      <div className={"bg-blue-200 p-4 col-span-1"}>
        <p className={"text-[1rem] text-gray-600"}>Search for friends</p>
        <div className={"border-t-2 border-gray-400 mt-2"}></div>

        <div className={"text-black"}>
          {conversations.map((c, index) => {
            {
              // console.log("c:", c);
            }
            return (
              <div
                className="cursor-pointer"
                key={index}
                onClick={() => {
                  setCurrentChat(c);
                }}
              >
                <Conversation key={index} conversation={c} userId={id} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-span-3 max-h-[535px] p-4 flex flex-col border-l-2 border-r-4 border-gray-400 relative max-w-full ">
        {currentChat ? (
          <>
            <div
              className=" mb-[4rem] flex-grow overflow-y-auto"
              ref={messageContainerRef}
            >
              {currentMessages &&
                currentMessages.map((msg, index) => {
                  return (
                    <div key={index}>
                      <Message
                        // key={index}
                        message={msg}
                        own={msg.sender === id}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="mt-[4rem] absolute bottom-0 left-0 w-full gap-2 ">
              <textarea
                className="w-full text-md px-4 py-[1rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none relative "
                placeholder="Type your message..."
                onChange={handleChange}
                value={newMessage}
                onKeyDown={handleKeyPress}
              ></textarea>
              <button
                className="btn px-4 rounded-lg bg-blue-500 text-white h-[30px] absolute right-0 bottom-2"
                onClick={handleSubmit}
              >
                <IoMdSend />
              </button>
            </div>
          </>
        ) : (
          <div className="min-h-full text-center text-[2rem] text-gray-400 font-bold m flex justify-center items-center">
            <span>Open conversion to start a chat</span>
          </div>
        )}
      </div>

      <div className={" p-4 col-span-1"}>
        <div className={""}>
          {/* {persons.map((p, index) => {
            return (
              <div
                key={index}
                className={
                  "flex gap-2 items-center py-[1rem] font-Roboto font-bold text-gray-600"
                }
              >
                <span className={"mx-2 rounded-full bg-gray-300 p-1 relative"}>
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                  <IoPersonOutline />
                </span>{" "}
                <p>{p.name}</p>
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
