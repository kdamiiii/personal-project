"use client";

import { Card } from "@/components/cards";
import { useFetchEnrollmentCourses } from "@/utils/fetchEnrollmentData";

export const CourseSection: React.FC<{ enrollmentId: string }> = ({
  enrollmentId,
}) => {
  const { isLoading, data, isFetched } =
    useFetchEnrollmentCourses(enrollmentId);

  return (
    <Card className="bg-white p-5 h-fit w-fit items-center">
      {!isLoading && isFetched && !!data && (
        <div className="flex flex-col w-full">
          <div className="text-xl mb-5">COURSE AND SUBJECTS INFORMATION</div>
          <div className="">
            Selected Course:{" "}
            <span className="font-normal">{data.course_name}</span>
          </div>
          <div className="text-lg">Subjects</div>
          {data.CourseSubjects.map((subject) => (
            <div className="flex w-full font-normal" key={subject.id}>
              <div>{`${subject.subject_name}`}</div>
              <div className="ml-auto">{`${subject.units} units`}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
