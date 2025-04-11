import { apiHostname } from "@/constants/generalTypes";
import { useQuery } from "@tanstack/react-query";

type SubjectsPayload = {
  id: string;
  subject_code: string;
  subject_name: string;
  subject_description: string;
  units: number;
  prereqisite: string;
};

type ModifiedSubjectType = {
  id: string;
  subjectCode: string;
  subjectName: string;
  subjectDescription: string;
  units: number;
  prerequisite: string;
};

export const fetchSubjectsData = async (): Promise<Array<SubjectsPayload>> => {
  const res = await fetch(
    `
    ${apiHostname}/subjects`,
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
  courseId: string
): Promise<ModifiedSubjectType> => {
  const res = await fetch(
    `
    ${apiHostname}/subjects/${courseId}`,
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

export const useFetchSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjectsData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchSubject = (subjectId: string) => {
  return useQuery({
    queryKey: ["courses", subjectId],
    queryFn: () => fetchSubjectData(subjectId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

const modifySubjectData = (data: SubjectsPayload): ModifiedSubjectType => {
  return {
    id: data.id,
    subjectCode: data.subject_code,
    subjectName: data.subject_name,
    subjectDescription: data.subject_description,
    units: data.units,
    prerequisite: data.prereqisite || "None",
  };
};
