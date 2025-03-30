import { CourseType } from "@/components/courses";

export const COURSES: CourseType[] = [
  {
    name: "Bachelor of Science in Business Administration",
    category: "CHED",
    description:
      "This program equips students with essential business skills, including management, marketing, finance, and entrepreneurship.",
    picture: "/photos/BA.jpg",
    majors: [
      "Financial Management",
      "Operations Management",
      "Human Resource Development Management",
    ],
  },
  {
    name: "Bachelor of Science in Hotel and Restaurant Management",
    picture: "/photos/HRM.jpg",
    description:
      "This program provides students with hands-on training in hospitality management, including hotel operations, food service, and customer relations.",
    category: "CHED",
  },
  {
    name: "Bachelor of Technical Teacher Education",
    picture: "/photos/Educator.jpg",
    description:
      "This program prepares students to become skilled educators in technical and vocational fields.",
    majors: ["Food Service Management", "Automotive"],
    category: "CHED",
  },
];

type CategoryColorType = {
  [key: string]: string;
};

export const CATEGORY_COLOR: CategoryColorType = {
  CHED: "bg-blue-950",
  TESDA: "bg-amber-400",
  MODULAR: "bg-green-600",
};
