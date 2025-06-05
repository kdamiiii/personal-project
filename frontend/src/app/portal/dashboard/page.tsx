"use client";

import Calendar from "@/components/calendar";
import { useRef } from "react";

export default function Dashboard() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      <button
        onClick={() => {
          fetch("http://localhost:8001/testNotification", {
            method: "GET",
          });
        }}
      >
        NOTIF TESTER
      </button>
      <div>
        <button onClick={play}>Play</button>
        <audio ref={audioRef} src="/static/notif.mp3" />
      </div>
      <Calendar />
    </>
  );
}
