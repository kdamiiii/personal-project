"use client";

import { Card } from "@/components/cards";
import { Spinner } from "@/components/spinner";
import { useFetchClass } from "@/utils/fetchClassData";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function ClassPage({ params }: Props) {
  const unwrappedParams = use(params);
  const { isLoading, data, isFetched } = useFetchClass(unwrappedParams.id);

  return (
    <>
      {isLoading && !data && !isFetched ? (
        <Spinner />
      ) : (
        <>
          <Card className="flex-col gap-2 my-4 p-5 bg-white max-w-3xl">
            <h2 className="text-3xl text-gray-900">
              [{data?.subjectCode}] {data?.subjectName}
            </h2>
            <h2 className="text-gray-600 text-lg ">
              Class Code: {data?.classCode}
            </h2>
            <h2 className="text-gray-600 text-lg ">
              Schedule: {data?.schedule} · {data?.timeStart} - {data?.timeEnd}
            </h2>
            <h2 className="text-gray-600 text-lg ">
              Instructor: {data?.instructorName}
            </h2>
            <h2 className="text-gray-600 text-lg ">
              Room: {data?.room || "N/A"}
            </h2>
            <h2 className="text-gray-600 text-lg ">Units: {data?.units}</h2>
            <h2 className="text-gray-600 text-lg ">
              Active: {data?.active ? "Yes" : "No"}
            </h2>
          </Card>
          {/* <Card className="bg-white max-w-8xl p-5 gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl text-gray-900">Subjects</h2>
              <CourseSubjectAdder courseId={unwrappedParams.id} size="2em" />
            </div>
            <CourseSubjects subjects={data?.subjects} />
          </Card> */}
        </>
      )}
    </>
  );
}
