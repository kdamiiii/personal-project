"use client";

import { Button } from "@/components/buttons";
import { DropDown, TestForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { CourseTypeEnum } from "@/utils/fetchCourseData";
import { getEnumKeyFromValue, getEnumValues } from "@/utils/textUtils";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

export default function Courses() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      courseName: "",
      courseType: CourseTypeEnum.BACCALAUREATE,
      courseCode: "",
      courseDescription: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(apiHostname + "/courses", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            course_name: value.courseName,
            course_type: getEnumKeyFromValue(CourseTypeEnum, value.courseType),
            course_code: value.courseCode,
            course_description: value.courseDescription,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new RequestError(
            errorData.status,
            errorData.message || "Something went wrong"
          );
        }
        router.push("/portal/dashboard/courses");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl">Create New Course</h2>
      <div className="flex items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5 w-[30%]"
        >
          <TestForm
            form={form}
            row
            name="courseName"
            label="Course Name"
            placeHolder="Enter Course Name"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Course name is required" : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            row
            name="courseCode"
            label="Course Code"
            placeHolder="Enter Course Code"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Course name is required" : undefined;
              },
            }}
          />
          <DropDown
            form={form}
            values={getEnumValues(CourseTypeEnum)}
            name="courseType"
            label="Course Type"
            validators={{
              onChange: ({ value }) => {
                return !value ? "User name is required" : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            name="courseDescription"
            label="Course Description"
            placeHolder="Enter Course Description"
            textarea
            validators={{
              onChange: ({ value }) => {
                return !value ? "Course name is required" : undefined;
              },
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            // eslint-disable-next-line react/no-children-prop
            children={([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit} type="submit" className="w-full">
                {isSubmitting ? <Spinner /> : "Create New Course"}
              </Button>
            )}
          />
        </form>
      </div>
    </div>
  );
}
