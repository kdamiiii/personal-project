"use client";

import { Button } from "@/components/buttons";
import { CourseCard } from "@/components/courses";
import { FormInput } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useFetchCourses } from "@/utils/fetchCourseData";
import { FaPlus } from "react-icons/fa6";
// import { fetchCurrentUserData } from "@/utils/fetchUserData";

export default function Courses() {
  const { isLoading, data, isFetching } = useFetchCourses();

  return (
    <div>
      <div className="flex items-center gap-3">
        <p className="">Search</p>
        <FormInput />
        <Button className="ml-auto h-full gap-2">
          New Course <FaPlus />
        </Button>
      </div>
      <div className="pt-5">
        {!!data && !isLoading && !isFetching ? (
          data.length < 1 ? (
            "No courses available at the moment"
          ) : (
            data.map((c) => (
              <CourseCard
                key={c.id}
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
