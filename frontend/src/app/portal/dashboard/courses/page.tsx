"use client";

import { Button } from "@/components/buttons";
import { CourseCard } from "@/components/courses";
import { FormInput } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useFetchCourses } from "@/utils/fetchCourseData";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
// import { fetchCurrentUserData } from "@/utils/fetchUserData";

export default function Courses() {
  const { isLoading, data, isFetching } = useFetchCourses();

  return (
    <div>
      <div className="flex items-center gap-3">
        <p className="">Search</p>
        <FormInput />
        <Link
          className="ml-auto h-full"
          href="/portal/dashboard/courses/newcourse"
        >
          <Button className="gap-2">
            New Course <FaPlus />
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-[1%] space-y-[1%] justify-between pt-5">
        {!!data && !isLoading && !isFetching ? (
          data.length < 1 ? (
            "No courses available at the moment"
          ) : (
            data.map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                link="courses"
                courseName={c.course_name}
                courseType={c.course_type}
              />
            ))
          )
        ) : (
          <div className="flex justify-center w-full">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
