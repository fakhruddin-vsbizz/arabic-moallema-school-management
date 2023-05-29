export default (io, socket) => {
  const createdMessage = (msg) => {
    const {
      id,
      created_at,
      user_id,
      batch_id,
      message,
      user_email,
      user_name,
    } = msg;

    const newMessage = {
      id,
      created_at,
      user_id,
      batch_id,
      message,
      user_email,
      user_name,
    };

    // Emit the new message event to all sockets
    io.emit("newIncomingMessage", newMessage);
  };

  socket.on("createdMessage", createdMessage);

  // Set the username for the socket
  socket.on("setUsername", (username) => {
    socket.username = username;
  });
};
