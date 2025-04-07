import { FaCalendarDay, FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";

type Permissions = {
  name: string;
  icon: React.ReactNode;
  link: string;
  roles: ["ADMIN" | "FACULTY" | "STUDENT" | "ALL"];
};

export const SIDEBAR_PERMISSIONS: Permissions[] = [
  {
    name: "Dashboard",
    roles: ["ALL"],
    link: "/portal/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Courses",
    roles: ["ALL"],
    link: "/portal/dashboard/courses",
    icon: <FaBook />,
  },
  {
    name: "Calendar",
    roles: ["ALL"],
    link: "/portal/calendar",
    icon: <FaCalendarDay />,
  },
  {
    name: "Notifications",
    roles: ["ALL"],
    link: "/portal/notifications",
    icon: <FaHome />,
  },
];
