import { apiHostname } from "@/constants/generalTypes";
import { useQuery } from "@tanstack/react-query";
import { UserData, UserDataPayload } from "./fetchUserData";

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
  course_description: string;
  course_code: string;
  Portal_User: Omit<UserDataPayload, "User_Role" | "Credential">;
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
): Promise<ModifiedCourseType> => {
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

  return modifyCourseData(data);
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

type ModifiedCourseType = {
  courseName: string;
  courseDescription: string;
  courseCode: string;
  courseType: CourseTypeEnum;
  user: Omit<UserData, "role" | "username" | "email">;
};

const modifyCourseData = ({
  course_name,
  course_type,
  course_description,
  course_code,
  Portal_User,
}: CourseType) => {
  return {
    courseName: course_name,
    courseType: course_type,
    courseDescription: course_description,
    courseCode: course_code,
    user: {
      firstName: Portal_User.first_name,
      lastName: Portal_User.last_name,
      id: Portal_User.id,
    },
  } as ModifiedCourseType;
};
