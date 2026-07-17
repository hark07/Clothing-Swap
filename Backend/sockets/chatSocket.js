import Message from "../models/Message.js";

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("join_room", (roomId) => {
      socket.join(roomId);

      console.log(`Joined Room: ${roomId}`);
    });

    socket.on("send_message", async (data) => {
      try {
        console.log("MESSAGE DATA:", data);

        if (!data.swapId || !data.senderId || !data.message) {
          console.log("Missing required fields");

          return;
        }

        const savedMessage = await Message.create({
          swap: data.swapId,
          sender: data.senderId,
          message: data.message,
        });

        const populatedMessage = await Message.findById(
          savedMessage._id,
        ).populate("sender", "name profileImage");

        io.to(data.roomId).emit("receive_message", populatedMessage);

        console.log("Message Sent Successfully");
      } catch (error) {
        console.log("CHAT ERROR:");

        console.log(error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected");
    });
  });
};

export default chatSocket;
