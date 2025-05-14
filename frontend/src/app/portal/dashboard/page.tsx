"use client";

import { fetchCurrentUserData } from "@/utils/fetchCurrentUser";

export default function Dashboard() {
  return (
    <button
      onClick={() => {
        const res = fetch("http://localhost:8001/testNotification", {
          method: "GET",
        });
      }}
    >
      NOTIF TESTER
    </button>
  );
}
