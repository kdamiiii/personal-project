"use client";

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
  const { isLoading, data } = useFetchCourse(unwrappedParams.id);
  return (
    <>
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-5">
          <h2 className="text-4xl">{data?.course_name}</h2>
          <h2 className="text-2xl font-normal">{data?.course_type}</h2>
          <h2>Created by: {data?.userId}</h2>
        </div>
      )}
    </>
  );
}
