"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import type {
  NotificationType,
  ServerToClientEvents,
} from "../../types/socketEvents";

const SOCKET_HOST = process.env.NEXT_PUBLIC_SOCKET;
let socket: Socket<ServerToClientEvents> | null = null;

const SocketListener = () => {
  const [messages, setMessages] = useState<NotificationType[]>([]);

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_HOST); // Replace with your backend
    }

    const handleNotify = (message: NotificationType) => {
      setMessages((prev) => [...prev, message]);

      setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, 7000);
    };

    socket.on("notify", handleNotify);

    return () => {
      socket?.off("notify", handleNotify);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 min-w-[20vw] z-50">
      {messages.map((msg, index) => {
        return (
          <div
            className="bg-gray-800 text-white p-3 rounded-lg shadow-lg animate-fade-up animate-duration-500"
            key={index}
          >
            {msg.notif_title}
            <p className="font-normal">{msg.notif_description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SocketListener;
