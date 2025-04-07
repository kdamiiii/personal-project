import { SideBar } from "@/components/sidebar";

export default async function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className="flex justify-center items-center w-screen h-screen"
      style={{
        backgroundImage: "url(../photos/bg.svg)",
        backgroundSize: "cover",
      }}
    >
      <SideBar />
      {children}
    </main>
  );
}
