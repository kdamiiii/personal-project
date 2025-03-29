import { CourseCategoryType, CourseType } from "@/components/courses";

export const COURSES: CourseCategoryType[] = [
  {
    name: "CHED - Registered Courses",
    courses: [
      {
        name: "Bachelor of Science in Business Administration",
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
      },
      {
        name: "Bachelor of Technical Teacher Education",
        picture: "/photos/Educator.jpg",
        majors: ["Food Service Management", "Automotive"],
      },
    ],
  },
];
