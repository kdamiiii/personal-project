import { NavBar } from "@/components/navbar/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <NavBar /> {children}
    </main>
  );
}
