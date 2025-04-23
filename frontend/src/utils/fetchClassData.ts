import { apiHostname } from "@/constants/generalTypes";
import { useQuery } from "@tanstack/react-query";

export type ClassPayload = {
  id: string;
  class_code: string;
  schedule: string;
  time_start: string;
  time_end: string;
  active: boolean;
  Portal_User: {
    id: string;
    first_name: string;
    last_name: string;
  };
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
  schedule: string;
  timeStart: string;
  timeEnd: string;
  active: boolean;
  instructorId: string;
  instructorName: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  units: number;
  room?: string;
};

export const modifyClassPayload = ({
  id,
  class_code,
  schedule,
  time_start,
  time_end,
  active,
  Portal_User: { id: instructorId, first_name, last_name },
  Subject: { id: subjectId, subject_code, subject_name, units },
  room,
}: ClassPayload): ModifiedClassPayload => {
  return {
    id,
    classCode: class_code,
    schedule,
    timeStart: time_start,
    timeEnd: time_end,
    active,
    instructorId,
    instructorName: `${first_name} ${last_name}`,
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

export const useFetchClasses = () => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: fetchClassesData,
  });
};

export const useFetchClass = (id: string) => {
  return useQuery({
    queryKey: ["classes", id],
    queryFn: () => fetchClassData(id),
  });
};
