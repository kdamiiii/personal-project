import { CourseCategoryType, CourseType } from "@/components/courses";

export const COURSES: CourseCategoryType[] = [
  {
    name: "CHED - Registered Courses",
    courses: [
      {
        name: "Bachelor of Science in Business Administration",
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
      },
      {
        name: "Bachelor of Technical Teacher Education",
        picture: "/photos/Educator.jpg",
        description:
          "This program prepares students to become skilled educators in technical and vocational fields.",
        majors: ["Food Service Management", "Automotive"],
      },
    ],
  },
];
