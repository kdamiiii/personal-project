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

export const useFetchSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjectsData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
