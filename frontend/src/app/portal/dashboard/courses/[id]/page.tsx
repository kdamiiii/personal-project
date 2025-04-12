"use client";

import { Card } from "@/components/cards";
import { CourseSubjectAdder, CourseSubjects } from "@/components/courses";
import { Spinner } from "@/components/spinner";
import { useFetchCourse } from "@/utils/fetchCourseData";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function CoursePage({ params }: Props) {
  const unwrappedParams = use(params);
  const { isLoading, data, isFetched } = useFetchCourse(unwrappedParams.id);

  return (
    <>
      {isLoading && !data && !isFetched ? (
        <Spinner />
      ) : (
        <>
          <Card className="flex-col gap-2 my-4 p-5 bg-white max-w-3xl">
            <h2 className="text-3xl text-gray-900">{data?.courseName}</h2>
            <h2 className="text-gray-600 text-lg ">
              {data?.courseCode} · {data?.courseType}
            </h2>
            <p className="text-md text-gray-500">
              Created by{" "}
              <span className="font-semibold text-gray-700">Kurt Damian</span>
            </p>
            <hr />
            <p className="text-md">{data?.courseDescription}</p>
          </Card>
          <Card className="bg-white max-w-8xl p-5 gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl text-gray-900">Subjects</h2>
              <CourseSubjectAdder courseId={unwrappedParams.id} size="2em" />
            </div>
            <CourseSubjects subjects={data?.subjects} />
          </Card>
        </>
      )}
    </>
  );
}
