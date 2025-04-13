"use client";

import { Button } from "@/components/buttons";
import { TestForm, DropDown } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { useFetchSubjects } from "@/utils/fetchSubjects";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

const NewClassPage: React.FC = () => {
  const router = useRouter();
  const { data: subjects } = useFetchSubjects();

  const form = useForm({
    defaultValues: {
      classCode: "",
      classSubject: "",
      classInstructor: "",
      schedule: "",
      timeStart: "",
      timeEnd: "",
      room: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(apiHostname + "/classes", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            class_code: value.classCode,
            class_subject: value.classSubject,
            class_instructor: value.classInstructor,
            schedule: value.schedule,
            time_start: value.timeStart,
            time_end: value.timeEnd,
            room: value.room,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new RequestError(
            errorData.status,
            errorData.message || "Something went wrong"
          );
        }
        router.push("/portal/dashboard/classes");
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
            name="classCode"
            label="Class Code"
            placeHolder="Enter Class Code"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Class code is required" : undefined;
              },
            }}
          />
          <DropDown
            form={form}
            values={
              subjects ? subjects.map((subject) => subject.subject_name) : []
            }
            name="classSubject"
            label="Class Subject"
            placeHolder="Select Class Subject"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Class subject is required" : undefined;
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
      ;
    </div>
  );
};

export default NewClassPage;
