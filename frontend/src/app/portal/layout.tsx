"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <main
        className="flex justify-center items-center w-screen h-screen"
        style={{
          backgroundImage: "url(http://localhost:3000/photos/bg.svg)",
          backgroundSize: "cover",
        }}
      >
        {children}
      </main>
    </QueryClientProvider>
  );
}
