"use client";

import { SIDEBAR_PERMISSIONS } from "@/constants/roles";
import Link from "next/link";
import { IoNotificationsSharp } from "react-icons/io5";
import { Button } from "./buttons";
import { Card } from "./cards";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { UserData } from "@/utils/fetchUserData";
import { usePathname } from "next/navigation";
import { getSelectedTab } from "@/utils/textUtils";

export const SideBar: React.FC<{ userData: UserData }> = ({ userData }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-[15%] h-screen text-white items-center pb-5">
      <div className="flex flex-col justify-center items-center  w-full bg-[#DDA853] py-5">
        <div className="flex justify-center items-center bg-blue-600 h-[5em] w-[5em] rounded-full text-white">
          {userData.firstName[0] + userData.lastName[0]}
        </div>
        <p className="text-[#183B4E]">{userData.username}</p>
      </div>
      {SIDEBAR_PERMISSIONS.map((btn) => (
        <SidebarButton
          link={btn.link}
          icon={btn.icon}
          selected={getSelectedTab(pathname, btn.link)}
          key={btn.name}
          name={btn.name}
        />
      ))}
      <SidebarButton
        className="mt-auto"
        selected={false}
        link="/portal"
        icon={<FaArrowRightFromBracket />}
        name="Logout"
      />
    </div>
  );
};

type SidebarButtonProps = {
  icon: React.ReactNode;
  name: string;
  link: string;
  selected: boolean;
  className?: string;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  name,
  link,
  selected,
  className = "",
}) => {
  return (
    <Link
      href={link}
      className={`w-full border-b-gray-500 px-5 py-3 flex gap-2 items-center hover:bg-blue-100 transition-colors duration-400 hover:cursor-pointer 
        hover:text-[#003665]
        ${selected && "bg-white text-[#003665]"} ${className}`}
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
