"use client";

import { SIDEBAR_PERMISSIONS } from "@/constants/roles";
import Link from "next/link";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { UserData } from "@/utils/fetchUserData";
import { usePathname } from "next/navigation";
import { getSelectedTab } from "@/utils/textUtils";

export const SideBar: React.FC<{ userData: UserData }> = ({ userData }) => {
  const pathname = usePathname();

  //#eea42e - old gold
  //#003665 - dark blue
  //#446498 - light blue
  //#d9a21b - new gold

  return (
    <div className="flex flex-col w-[15%] h-screen text-white bg-[#003665] items-center pb-5">
      <div className="flex items-center gap-2 px-5 w-full bg-[#d9a21b] py-5">
        <div className="flex justify-center items-center bg-[#003665] h-[3em] w-[3em] rounded-full text-white">
          {userData.firstName[0] + userData.lastName[0]}
        </div>
        <p className="text-white">{userData.username}</p>
      </div>
      {/* <div className="border-b-1 border-white w-full"></div> */}
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
        ${selected && "bg-[#446498]"} ${className}`}
    >
      {icon}
      {name}
    </Link>
  );
};
