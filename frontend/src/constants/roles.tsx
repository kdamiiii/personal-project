import { FaCalendarDay, FaHome } from "react-icons/fa";
import {
  FaBell,
  FaBook,
  FaBookOpenReader,
  FaCheckToSlot,
  FaCodeBranch,
} from "react-icons/fa6";

type Permissions = {
  name: string;
  icon: React.ReactNode;
  link: string;
  roles: ["ADMIN" | "FACULTY" | "STUDENT" | "ALL"];
  hasNotif?: boolean;
  notifKey?: string;
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
    icon: <FaCodeBranch />,
  },
  {
    name: "Subjects",
    roles: ["ALL"],
    link: "/portal/dashboard/subjects",
    icon: <FaBook />,
  },
  {
    name: "Classes",
    roles: ["ALL"],
    link: "/portal/dashboard/classes",
    icon: <FaBookOpenReader />,
  },
  {
    name: "Calendar",
    roles: ["ALL"],
    link: "/portal/dashboard/calendar",
    icon: <FaCalendarDay />,
  },
  {
    name: "Enrollment Requests",
    roles: ["ALL"],
    link: "/portal/dashboard/enrollment/requests",
    icon: <FaCheckToSlot />,
    hasNotif: true,
    notifKey: "ah_pending",
  },
  {
    name: "Notifications",
    roles: ["ALL"],
    link: "/portal/dashboard/notifications",
    icon: <FaBell />,
  },
];
