import { Card } from "@/components/cards";
import { PortalNavbar, SideBar } from "@/components/sidebar";

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
      <div className="w-[85%]">
        <PortalNavbar />
        <Card className="bg-gray-500 w-full h-[95vh]">{children}</Card>
      </div>
    </main>
  );
}
