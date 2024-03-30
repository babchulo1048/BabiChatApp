const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  //   console.log("userId:", id);
  //   console.log("socketId:", socketId);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUsers = (receiverId) => {
  console.log("receiverId:", receiverId);
  console.log("users1:", users);

  return users.find((user) => user.userId === receiverId);
  // console.log("users:", users);
};

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("adduser", (id) => {
    addUser(id, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUsers(receiverId);
    console.log("user:", user);

    io.to(user.socketId).emit("getMessages", {
      senderId,
      text,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
