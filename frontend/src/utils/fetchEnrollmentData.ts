import { apiHostname } from "@/constants/generalTypes";
import { useQuery } from "@tanstack/react-query";
import { CourseType } from "./fetchCourseData";

export type EnrollmentDataPayload = {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string;
  email?: string;
  city_address: string;
  contact_number: string;
  provincial_address?: string;
  sex: string;
  birth_place: string;
  birth_date: string;
  religious_affiliation?: string;
  civil_status?: string;
  Parent_Details: EnrollmentParentDataPayload;
  Schools_Details: EnrollmentStudentHistoryPayload[];
  Enrollment_Requirements: EnrollmentRequirementsPayload;
  status: string;
  ah_status: string;
  finance_status: string;
  courses: CourseType[];
};

export type EnrollmentParentDataPayload = {
  id: string;
  father_name: string;
  father_occupation?: string;
  father_contact_number?: string;
  father_address?: string;
  mother_name: string;
  mother_occupation?: string;
  mother_contact_number?: string;
  mother_address?: string;
  guardian_name?: string;
  guardian_relationship?: string;
  guardian_occupation?: string;
  guardian_contact_number?: string;
};

export type EnrollmentStudentHistoryPayload = {
  id: string;
  elementary_school?: string;
  elementary_year_graduated?: string;
  junior_high_school?: string;
  junior_high_school_year_graduated?: string;
  senior_high_school?: string;
  senior_high_school_year_graduated?: string;
  last_school_attended?: string;
  last_school_attended_year?: string;
};

export type EnrollmentRequirementsPayload = {
  id: string;
  form_137?: boolean;
  form_138?: boolean;
  certificate_of_good_moral?: boolean;
  birth_certificate?: boolean;
  certified_true_copy: boolean;
  transfer_credential?: boolean;
  official_transript_of_record?: boolean;
  permit_to_cross_enroll?: boolean;
};

export type EnrollmentRequestListPayload = Pick<
  EnrollmentDataPayload,
  "first_name" | "last_name" | "status" | "id" | "ah_status" | "finance_status"
> & {
  courses: [
    {
      course_name: string;
      Enrollment_Course: {
        selected_course: string;
      };
    }
  ];
};

export const fetchEnrollmentData = async (
  id: string
): Promise<EnrollmentDataPayload> => {
  const res = await fetch(`${apiHostname}/enrollment_details/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch enrollment data");
  }

  const data = await res.json();
  return data;
};

export const fetchEnrollmentRequests = async (): Promise<
  Array<EnrollmentRequestListPayload>
> => {
  const res = await fetch(`${apiHostname}/enrollment_details/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch enrollment data");
  }

  const data: EnrollmentRequestListPayload[] = await res.json();
  return data;
};

export const fetchEnrollmentCourses = async (
  courseId: string
): Promise<CourseType> => {
  const res = await fetch(
    `${apiHostname}/courses/${courseId}/subjects/firstYear/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch enrollment data");
  }

  const data: CourseType = await res.json();

  return data;
};

export const fetchEnrollmentRequestCount = async (): Promise<{
  ah_pending: number;
}> => {
  const res = await fetch(`${apiHostname}/enrollment_details/request_count/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch enrollment data");
  }

  const data: { ah_pending: number } = await res.json();

  return data;
};

export const useFetchEnrollmentRequests = () => {
  return useQuery({
    queryKey: ["enrollment"],
    queryFn: () => fetchEnrollmentRequests(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchEnrollmentDetails = (enrollmentId: string) => {
  return useQuery({
    queryKey: ["enrollment", enrollmentId],
    queryFn: () => fetchEnrollmentData(enrollmentId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchEnrollmentCourses = (courseId: string) => {
  return useQuery({
    queryKey: ["enrollmentCourses", courseId],
    queryFn: () => fetchEnrollmentCourses(courseId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchEnrollmentRequestCount = () => {
  return useQuery({
    queryKey: ["enrollmentRequestCount"],
    queryFn: () => fetchEnrollmentRequestCount(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
