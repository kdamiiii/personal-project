import { apiHostname } from "@/constants/generalTypes";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

export type SubjectsPayload = {
  id: string;
  subject_code: string;
  subject_name: string;
  subject_description: string;
  units: number;
  prereqisite: string;
  price: number;
  Course_Subjects?: {
    student_year: string;
    semester: string;
  };
};

export type ModifiedSubjectType = {
  id: string;
  subjectCode: string;
  subjectName: string;
  subjectDescription: string;
  units: number;
  price: number;
  prerequisite: string;
};

export const fetchSubjectsData = async (
  offset: number,
  search: string | null = null
): Promise<Array<SubjectsPayload>> => {
  const res = await fetch(
    `
    ${apiHostname}/subjects?limit=20&orderBy=subject_code&offset=${offset}${
      search ? `&name=${search}` : ""
    }`,
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

export const fetchSubjectData = async (
  subjectId: string
): Promise<ModifiedSubjectType> => {
  const res = await fetch(
    `
    ${apiHostname}/subjects/${subjectId}`,
    {
      method: "GET",
    }
  );
  if (res.status >= 400) {
    throw new Error("Not Found");
  }
  const data = await res.json();

  return modifySubjectData(data);
};

export const useFetchSubjects = (searchQuery: string = "") => {
  return useInfiniteQuery({
    queryKey: ["subjects", searchQuery],
    queryFn: ({ pageParam = 0 }) => fetchSubjectsData(pageParam, searchQuery),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return pages.length * 20;
    },
  });
};

export const useFetchSubject = (subjectId: string) => {
  return useQuery({
    queryKey: ["subjects", subjectId],
    queryFn: () => fetchSubjectData(subjectId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const modifySubjectData = (
  data: SubjectsPayload
): ModifiedSubjectType => {
  return {
    id: data.id,
    subjectCode: data.subject_code,
    subjectName: data.subject_name,
    subjectDescription: data.subject_description,
    units: data.units,
    prerequisite: data.prereqisite || "",
    price: data.price,
  };
};
