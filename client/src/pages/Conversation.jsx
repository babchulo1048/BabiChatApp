import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPersonOutline } from "react-icons/io5";

const Conversation = ({ conversation, userId }) => {
  // console.log("conversation1:", conversation);
  // console.log("userId1:", userId.user_Id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((c) => c._id !== userId);
    // console.log("friendId:", friendId);

    const getUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/user/detail/${friendId}`
        );
        // console.log("response4:", response.data);
        // Assuming formData is an array, and you want to access the userName from the first object
        const userName = response.data.formData;
        // console.log("UserName:", userName);
        setUser(response.data.formData);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, userId]);
  {
    // console.log("user:", user);
  }

  return (
    <div className="flex gap-2 items-center py-[1rem] font-Roboto font-bold text-gray-600">
      <span className={"mx-2 rounded-full bg-gray-300 p-1"}>
        <IoPersonOutline />
      </span>{" "}
      {user && user.userName && <p>{user.userName}</p>}
    </div>
  );
};

export default Conversation;
