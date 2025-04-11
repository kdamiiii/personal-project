"use client";

import { Button } from "@/components/buttons";
import { CourseCard } from "@/components/courses";
import { FormInput } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useFetchSubjects } from "@/utils/fetchSubjects";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function Courses() {
  const { isLoading, data, isFetched } = useFetchSubjects();

  return (
    <div>
      <div>
        <div className="flex items-center gap-3">
          <p className="">Search</p>
          <FormInput />
          <Link
            className="ml-auto h-full"
            href="/portal/dashboard/subjects/newsubject"
          >
            <Button className="gap-2">
              New Subject <FaPlus />
            </Button>
          </Link>
        </div>
      </div>
      {!isLoading && !!data && isFetched ? (
        data.length > 0 ? (
          <div className="flex flex-wrap gap-[1%] space-y-[1%] justify-start pt-5">
            {data?.map((d) => {
              return (
                <CourseCard
                  key={d.id}
                  id={d.id}
                  link="subjects"
                  courseName={d.subject_name}
                  courseType={d.subject_description}
                />
              );
            })}
          </div>
        ) : (
          <p>No Data Available</p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}
