"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { DropDown, TestForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import {
  educationalBackgroundForms,
  enrollmentForms,
  parentForms,
} from "@/constants/enrollment";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { CourseTypeEnum } from "@/utils/fetchCourseData";
import { getEnumKeyFromValue, getEnumValues } from "@/utils/textUtils";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

export default function Enrollment() {
  const router = useRouter();

  const defaultValues = {
    ...enrollmentForms.reduce((acc: Record<string, string>, curr) => {
      acc[curr.fieldName] = curr.defaultValue;
      return acc;
    }, {}),
    ...parentForms.reduce((acc: Record<string, string>, curr) => {
      acc[curr.fieldName] = curr.defaultValue;
      return acc;
    }, {}),
    ...educationalBackgroundForms.reduce(
      (acc: Record<string, string>, curr) => {
        acc[curr.fieldName] = curr.defaultValue;
        return acc;
      },
      {}
    ),
  };

  console.log(defaultValues);

  // fieldName,
  //     value.defaultValue,
  //   ]);

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        // const res = await fetch(apiHostname + "/courses", {
        //   method: "POST",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   credentials: "include",
        //   body: JSON.stringify({
        //     course_name: value.courseName,
        //     course_type: getEnumKeyFromValue(CourseTypeEnum, value.courseType),
        //     course_code: value.courseCode,
        //     course_description: value.courseDescription,
        //   }),
        // });
        // if (!res.ok) {
        //   const errorData = await res.json();
        //   throw new RequestError(
        //     errorData.status,
        //     errorData.message || "Something went wrong"
        //   );
        // }
        // router.push("/portal/dashboard/courses");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <Card className="flex overflow-y-scroll p-5 bg-white flex-col gap-5">
      <div className="flex items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-wrap justify-between w-[100%] gap-5"
        >
          <h2 className="text-2xl w-full">Fill up student information</h2>
          {enrollmentForms.map((obj) => (
            <div
              key={obj.fieldName}
              className={`flex ${obj.containerLength ?? "flex-1"}`}
            >
              <TestForm
                form={form}
                name={obj.fieldName}
                label={obj.label}
                areaLength="w-full"
                placeHolder={`Enter ${obj.label}`}
                validators={{
                  onChange: ({ value }) => {
                    return !value ? `${obj.label} is required` : undefined;
                  },
                }}
              />
            </div>
          ))}
          <div className="w-full border-b-2" />

          <h2 className="text-2xl w-full">Parent / Guardian information</h2>
          {parentForms.map((obj) => (
            <div
              key={obj.fieldName}
              className={`flex ${obj.containerLength ?? "flex-1"}`}
            >
              <TestForm
                form={form}
                name={obj.fieldName}
                label={obj.label}
                areaLength="w-full"
                placeHolder={`Enter ${obj.label}`}
                validators={{
                  onChange: ({ value }) => {
                    return !value ? `${obj.label} is required` : undefined;
                  },
                }}
              />
            </div>
          ))}
          <div className="w-full border-b-2" />
          <h2 className="text-2xl w-full">Educational Background</h2>
          {educationalBackgroundForms.map((obj) => (
            <div
              key={obj.fieldName}
              className={`flex ${obj.containerLength ?? "flex-1"}`}
            >
              <TestForm
                form={form}
                name={obj.fieldName}
                label={obj.label}
                areaLength="w-full"
                placeHolder={`Enter ${obj.label}`}
                validators={{
                  onChange: ({ value }) => {
                    return !value ? `${obj.label} is required` : undefined;
                  },
                }}
              />
            </div>
          ))}
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
    </Card>
  );
}
