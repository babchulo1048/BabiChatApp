import React, { useState, useEffect } from "react";
import { IoPersonOutline } from "react-icons/io5";
import axios from "axios";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  // console.log("sender:", own);
  // console.log("message", message);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        `http://localhost:3001/user/detail/${message.sender}`
      );

      // console.log("sender:", response.data);
      setUser(response.data);
    };

    fetchUser();
  }, [message]);
  return (
    <div
      //   key={index}
      className={`flex items-center gap-1 mb-[2rem] py-2  ${
        own ? "justify-start" : "justify-end"
      }`}
    >
      <span className="rounded-full bg-gray-300 p-1">
        <IoPersonOutline />
      </span>
      <div className="">
        <div
          className={` px-[2rem] py-2  text-white rounded-lg  ${
            !own ? "bg-blue-500 text-left" : "bg-green-500 text-right"
          } `}
        >
          <p>{message.text}</p>
        </div>
        {user && (
          <span className="text-[.7rem] mx-2">{user.formData.userName}</span>
        )}
        <span className="text-[.7rem] ">{format(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default Message;
