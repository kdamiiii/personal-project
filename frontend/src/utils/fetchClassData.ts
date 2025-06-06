import { apiHostname } from "@/constants/generalTypes";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export type ClassPayload = {
  id: string;
  class_code: string;
  schedule?: string;
  time_start?: string;
  time_end?: string;
  active?: boolean;
  Portal_User: {
    id?: string;
    first_name?: string;
    last_name?: string;
  } | null;
  Subject: {
    id: string;
    subject_code: string;
    subject_name: string;
    units: number;
  };
  room?: string;
};

export type ModifiedClassPayload = {
  id: string;
  classCode: string;
  schedule?: string;
  timeStart?: string;
  timeEnd?: string;
  active?: boolean;
  instructorId?: string;
  instructorName?: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  units: number;
  room?: string;
};

export const modifyClassPayload = ({
  id,
  class_code,
  schedule = "N/A",
  time_start = "N/A",
  time_end = "N/A",
  active = false,
  Portal_User,
  Subject: { id: subjectId, subject_code, subject_name, units },
  room,
}: ClassPayload): ModifiedClassPayload => {
  const user = Portal_User
    ? Portal_User
    : {
        id: "N/A",
        first_name: "No",
        last_name: "Instructor",
      };

  const newSchedule = !!schedule ? schedule : "";
  const newStart = !!time_start ? time_start : "";
  const newEnd = !!time_end ? time_end : "";

  return {
    id,
    classCode: class_code,
    schedule: newSchedule,
    timeStart: newStart,
    timeEnd: newEnd,
    active: active,
    instructorId: user?.id,
    instructorName: `${user?.first_name} ${user?.last_name}`,
    subjectId,
    subjectCode: subject_code,
    subjectName: subject_name,
    units,
    room,
  };
};

export const fetchClassesData = async (): Promise<ModifiedClassPayload[]> => {
  const res = await fetch(
    `
    ${apiHostname}/classes/`,
    {
      method: "GET",
    }
  );
  if (res.status >= 400) {
    throw new Error("Not Found");
  }
  const data: ClassPayload[] = await res.json();
  return data.map((d) => modifyClassPayload(d));
};

export const fetchClassData = async (
  id: string
): Promise<ModifiedClassPayload> => {
  const res = await fetch(
    `
    ${apiHostname}/classes/${id}/`,
    {
      method: "GET",
    }
  );
  if (res.status >= 400) {
    throw new Error("Not Found");
  }
  const data: ClassPayload = await res.json();

  return modifyClassPayload(data);
};

export const fetchInfiniteClassesData = async (
  offset: number,
  search: string | null = null
): Promise<Array<ModifiedClassPayload>> => {
  try {
    const res = await fetch(
      `
      ${apiHostname}/classes?limit=20&orderBy=class_code&offset=${offset}${
        search ? `&name=${search}` : ""
      }`,
      {
        method: "GET",
      }
    );

    if (res.status >= 400) {
      return [];
    }
    const data: ClassPayload[] = await res.json();
    return data.map((d) => modifyClassPayload(d));
  } catch (e) {
    console.log("error fetching classes", e);
    return [];
  }
};

export const useFetchClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClassesData,
  });
};

export const useInfiniteFetchClasses = (searchQuery: string = "") => {
  return useInfiniteQuery({
    queryKey: ["classes", searchQuery],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      fetchInfiniteClassesData(pageParam, searchQuery),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if ((lastPage as Array<ModifiedClassPayload>).length === 0)
        return undefined;
      return pages.length * 20;
    },
  });
};

export const useFetchClass = (id: string) => {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => fetchClassData(id),
  });
};
