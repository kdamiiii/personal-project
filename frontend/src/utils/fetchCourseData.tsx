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

export const fetchCourseData = async (
  courseId: string
): Promise<CourseType> => {
  const res = await fetch(
    `
    ${apiHostname}/courses/${courseId}`,
    {
      method: "GET",
    }
  );
  if (res.status >= 400) {
    throw new Error("Not Found");
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

export const useFetchCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => fetchCourseData(courseId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
