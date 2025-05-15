import { Server } from "socket.io";
import { createServer } from "http";

export const initiateIOServer = (app) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    broadcastNotifications(
      io,
      "notify",
      "SAMPLE TITLE",
      "THIS IS A SAMPLE NOTIFICATION"
    );
    socket.on("message", (msg) => {
      console.log("Received:", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return { server, io };
};

export const broadcastNotifications = (
  io,
  emit_name,
  notif_title,
  notif_description,
  notif_link = ""
) => {
  io.emit(emit_name, {
    notif_title,
    notif_description,
    notif_link,
  });
};
