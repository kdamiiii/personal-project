"use client";

import { Card } from "@/components/cards";
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
        <Card className="flex-col gap-2 my-4 p-5 bg-white max-w-3xl">
          <h2 className="flex gap-2 text-3xl text-gray-900">
            <span className="text-gray-700">[{data?.subjectCode}]</span>
            {data?.subjectName}
          </h2>
          <h2 className="text-gray-600 text-lg">{data?.units} Units</h2>
          <hr />
          <p className="text-md">{data?.subjectDescription}</p>
          <h2 className="text-2xl font-normal">
            Prerequisite: {data?.prerequisite || "None"}
          </h2>
        </Card>
      )}
    </>
  );
}
