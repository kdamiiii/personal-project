"use client";

import { SIDEBAR_PERMISSIONS } from "@/constants/roles";
import Link from "next/link";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { UserData } from "@/utils/fetchUserData";
import { usePathname } from "next/navigation";
import { getSelectedTab } from "@/utils/textUtils";
import { useFetchEnrollmentRequestCount } from "@/utils/fetchEnrollmentData";

export const SideBar: React.FC<{ userData: UserData }> = ({ userData }) => {
  const pathname = usePathname();
  const { isLoading, data, isFetched } = useFetchEnrollmentRequestCount();

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
      {SIDEBAR_PERMISSIONS.map((btn) => {
        return (
          <SidebarButton
            link={btn.link}
            icon={btn.icon}
            selected={getSelectedTab(pathname, btn.link)}
            key={btn.name}
            name={btn.name}
            hasNotif={btn?.hasNotif ?? false}
            isLoading={btn?.hasNotif ? isLoading : false}
            isFetched={btn?.hasNotif ? isFetched : false}
            notifCount={
              !!data && btn?.hasNotif
                ? data[btn?.notifKey as keyof typeof data]
                : 0
            }
          />
        );
      })}
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
  hasNotif?: boolean;
  notifCount?: number;
  isLoading?: boolean;
  isFetched?: boolean;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  name,
  link,
  selected,
  className = "",
  hasNotif = false,
  notifCount = 0,
  isLoading = false,
  isFetched = true,
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
      {hasNotif && !isLoading && isFetched && (
        <span className="bg-orange-700 p-1 w-6 h-6 text-center flex items-center justify-center rounded-full">
          {notifCount}
        </span>
      )}
    </Link>
  );
};
