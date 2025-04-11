"use client";

import { Spinner } from "@/components/spinner";
import { useFetchSubject } from "@/utils/fetchSubjects";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function SubjectPage({ params }: Props) {
  const unwrappedParams = use(params);
  const { isLoading, data } = useFetchSubject(unwrappedParams.id);
  return (
    <>
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl">{data?.subjectName}</h2>
          <h2 className="text-2xl font-normal">{data?.subjectCode}</h2>
          <h2 className="text-2xl font-normal">{data?.units} Units</h2>
          <h2 className="text-2xl font-normal">{data?.subjectDescription}</h2>
          <h2 className="text-2xl font-normal">
            Prerequisite: {data?.prerequisite || "None"}
          </h2>
        </div>
      )}
    </>
  );
}
