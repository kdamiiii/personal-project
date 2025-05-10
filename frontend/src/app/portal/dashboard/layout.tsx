import { Card } from "@/components/cards";
import { SideBar } from "@/components/sidebar";
import SocketListener from "@/components/wrappers/notifications";
import { fetchCurrentUserData } from "@/utils/fetchCurrentUser";
export default async function EnrollmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await fetchCurrentUserData();

  return (
    <main
      className="flex justify-center items-center w-screen h-screen"
      style={{
        backgroundImage: "url(../photos/bg.svg)",
        backgroundSize: "cover",
      }}
    >
      <SideBar userData={userData} />
      <div className="w-[85%]">
        <Card className="bg-[url('http://localhost:3000/photos/Kaway.svg')] w-full h-screen bg-cover p-5">
          {children}
        </Card>
      </div>
      <SocketListener />
    </main>
  );
}
