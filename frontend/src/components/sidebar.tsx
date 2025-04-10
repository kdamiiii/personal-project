import { SIDEBAR_PERMISSIONS } from "@/constants/roles";
import { fetchCurrentUserData } from "@/utils/fetchUserData";
import { getCurrentUrl } from "@/utils/textUtils";
import { headers } from "next/headers";
import Link from "next/link";
import { IoNotificationsSharp } from "react-icons/io5";
import { Button } from "./buttons";
import { Card } from "./cards";

export const SideBar: React.FC = async () => {
  const headersList = headers();
  const userData = await fetchCurrentUserData();
  if (!userData) return <></>;

  const fullUrl = (await headersList).get("referer") || "";
  const selected = getCurrentUrl(fullUrl);
  return (
    <div className="flex flex-col w-[15%] h-screen text-white items-center py-5">
      <div className="flex justify-center items-center bg-blue-600 h-[5em] w-[5em] rounded-full text-white">
        {userData.firstName[0] + userData.lastName[0]}
      </div>
      <p>{userData.username}</p>
      {SIDEBAR_PERMISSIONS.map((btn) => (
        <SidebarButton
          link={btn.link}
          icon={btn.icon}
          selected={selected}
          key={btn.name}
          name={btn.name}
        />
      ))}
    </div>
  );
};

type SidebarButtonProps = {
  icon: React.ReactNode;
  name: string;
  link: string;
  selected: string;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  name,
  link,
  selected,
}) => {
  return (
    <Link
      href={link}
      className={`w-full border-b-gray-500 px-5 py-3 flex gap-2 items-center hover:bg-blue-100 transition-colors duration-400 hover:cursor-pointer 
        hover:text-[#003665]
        ${selected === name.toLowerCase() && "bg-white text-[#003665]"}`}
    >
      {icon}
      {name}
    </Link>
  );
};

export const PortalNavbar: React.FC = () => {
  return (
    <Card className="flex flex-end justify-end items-center h-[5vh] bg-white border-b-1 text-[#003665] border-b-gray-600">
      <IoNotificationsSharp size={30} />
      <Button>Logout</Button>
    </Card>
  );
};
