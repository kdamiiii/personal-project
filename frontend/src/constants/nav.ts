import { IconType } from "react-icons";
import { FaRegUser } from "react-icons/fa";

export type NavButtonType = {
  name: string;
  link: string;
  icon?: IconType;
  options?: string;
};

export const NAV_BUTTONS: NavButtonType[] = [
  {
    name: "home",
    link: "/home",
  },
  {
    name: "courses",
    link: "/courses",
  },
  {
    name: "about",
    link: "/about",
  },
  {
    name: "contact",
    link: "/contact",
  },
  {
    name: "gallery",
    link: "/gallery",
  },
  {
    name: "login",
    link: "/login",
    icon: FaRegUser,
    options: "ml-auto",
  },
];
