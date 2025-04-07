import { FaCalendarDay, FaHome } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";

type Permissions = {
  name: string;
  icon: React.ReactNode;
  roles: ["ADMIN" | "FACULTY" | "STUDENT" | "ALL"];
};

export const SIDEBAR_PERMISSIONS: Permissions[] = [
  {
    name: "Dashboard",
    roles: ["ALL"],
    icon: <FaHome />,
  },
  {
    name: "Courses",
    roles: ["ALL"],
    icon: <FaBook />,
  },
  {
    name: "Calendar",
    roles: ["ALL"],
    icon: <FaCalendarDay />,
  },
  {
    name: "Notifications",
    roles: ["ALL"],
    icon: <FaHome />,
  },
];
