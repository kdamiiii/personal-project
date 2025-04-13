"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { TestForm, DropDown, CheckBoxForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { useFetchSubjects } from "@/utils/fetchSubjects";
import { useFetchUsers } from "@/utils/fetchUserData";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

const NewClassPage: React.FC = () => {
  const router = useRouter();
  const { data: subjects } = useFetchSubjects();
  const { data: users } = useFetchUsers();

  const form = useForm({
    defaultValues: {
      classCode: "",
      classSubject: "",
      classInstructor: "Select Class Instructor",
      schedule: [],
      timeStart: "",
      timeEnd: "",
      room: "",
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
        const classInstructor = users?.find(
          (user) =>
            `${user.firstName} ${user.lastName}` === value.classInstructor
        )?.id;
        const classSubject = subjects?.find(
          (subject) => subject.subject_name === value.classSubject
        )?.id;

        const res = await fetch(apiHostname + "/classes", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            class_code: value.classCode,
            class_subject: classSubject,
            class_instructor: classInstructor,
            schedule: value.schedule.join(""),
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
    <Card className="flex flex-col gap-5 bg-white p-5 max-w-[50%]">
      <h2 className="text-2xl">Create New Course</h2>
      <div className="flex items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5 w-full"
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
          <DropDown
            form={form}
            values={
              users
                ? users.map((user) => `${user.firstName} ${user.lastName}`)
                : []
            }
            name="classInstructor"
            label="Class Instructor"
            placeHolder="Select Class Instructor"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Class Instructor is required" : undefined;
              },
            }}
          />
          <CheckBoxForm
            form={form}
            row
            name="schedule"
            label="Schedule"
            options={[
              { label: "Monday", value: "M" },
              { label: "Tuesday", value: "T" },
              { label: "Wednesday", value: "W" },
              { label: "Thursday", value: "R" },
              { label: "Friday", value: "F" },
              { label: "Saturday", value: "S" },
              { label: "Sunday", value: "U" },
            ]}
          />
          <TestForm
            form={form}
            row
            name="timeStart"
            label="Time Start"
            placeHolder="Enter Time Start"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Time start is required" : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            row
            name="timeEnd"
            label="Time End"
            placeHolder="Enter Time End"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Time end is required" : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            row
            name="room"
            label="Room"
            placeHolder="Enter Room"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Room is required" : undefined;
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
    </Card>
  );
};

export default NewClassPage;
