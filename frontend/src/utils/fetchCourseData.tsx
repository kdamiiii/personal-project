import { apiHostname } from "@/constants/generalTypes";
import { useQuery } from "@tanstack/react-query";

export enum CourseTypeEnum {
  SHORT_COURSE = "SHORT COURSE",
  SENIOR_HIGHSCHOOL = "SENIOR HIGHSCHOOL",
  BACCALAUREATE = "BACCALAUREATE",
  DIPLOMA = "DIPLOMA",
}

export type CourseType = {
  id: string;
  course_name: string;
  course_type: CourseTypeEnum;
  userId: string;
};

export const fetchCoursesData = async (): Promise<Array<CourseType>> => {
  const res = await fetch(
    `
    ${apiHostname}/courses`,
    {
      method: "GET",
    }
  );
  if (res.status >= 400) {
    return [];
  }
  const data = await res.json();
  return data;
};

export const useFetchCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCoursesData,
  });
};
