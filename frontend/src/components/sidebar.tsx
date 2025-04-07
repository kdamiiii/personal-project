import { SIDEBAR_PERMISSIONS } from "@/constants/roles";
import { fetchCurrentUserData } from "@/utils/fetchUserData";
import { getCurrentUrl } from "@/utils/textUtils";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const SideBar: React.FC = async () => {
  const headersList = headers();
  const userData = await fetchCurrentUserData();
  if (!userData) return <></>;

  const fullUrl = (await headersList).get("referer") || "";
  const selected = getCurrentUrl(fullUrl);
  return (
    <div className="flex flex-col w-[15%] h-screen items-center bg-white py-5">
      <div className="flex justify-center items-center bg-blue-600 h-[5em] w-[5em] rounded-full text-white">
        K
      </div>
      <p>{userData.username}</p>
      {SIDEBAR_PERMISSIONS.map((btn) => (
        <SidebarButton
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
  selected: string;
};

const SidebarButton: React.FC<SidebarButtonProps> = ({
  icon,
  name,
  selected,
}) => {
  return (
    <div
      className={`w-full border-b-gray-500 px-5 py-3 flex gap-2 items-center hover:bg-blue-400 transition-colors duration-400 hover:cursor-pointer 
        hover:text-white
        ${selected === name.toLowerCase() && "bg-blue-500 text-white"}`}
    >
      {icon}
      {name}
    </div>
  );
};
