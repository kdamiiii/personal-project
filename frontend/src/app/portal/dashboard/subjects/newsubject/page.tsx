"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { TestForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

export default function Subjects() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      subjectName: "",
      subjectCode: "",
      subjectDescription: "",
      units: 0,
      prerequisite: "",
      price: 0,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(apiHostname + "/subjects", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            subject_name: value.subjectName,
            subject_code: value.subjectCode,
            subject_description: value.subjectDescription,
            price: value.price,
            units: value.units,
            prerequisite: value.prerequisite,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new RequestError(
            errorData.status,
            errorData.message || "Something went wrong"
          );
        }

        router.push("/portal/dashboard/subjects");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <Card className="flex flex-col p-5 h-full overflow-y-scroll bg-white gap-5">
      <h2 className="text-2xl">Create New Subject</h2>
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
            label="Subject Name"
            placeHolder="Enter subject name"
            name="subjectName"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Subject name is required" : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            row
            name="subjectCode"
            placeHolder="Enter subject code"
            label="Subject Code"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Subject code is required" : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            row
            name="units"
            placeHolder="Enter units"
            label="Units"
            type="number"
            validators={{
              onChange: ({ value }) => {
                return parseInt(value) <= 0
                  ? "Units must be greater than 0"
                  : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            row
            label="Price"
            name="price"
            validators={{
              onChange: ({ value }) => {
                return !value ? "Subject description is required" : undefined;
              },
            }}
          />
          <TestForm
            placeHolder="Select Pre-requisite"
            row
            label="Pre-requisite"
            form={form}
            name="prerequisite"
          />
          <TestForm
            form={form}
            row
            label="Subject Description"
            placeHolder="Enter subject description"
            name="subjectDescription"
            textarea
            validators={{
              onChange: ({ value }) => {
                return !value ? "Subject description is required" : undefined;
              },
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            // eslint-disable-next-line react/no-children-prop
            children={([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit} type="submit" className="w-full">
                {isSubmitting ? <Spinner /> : "Create New Subject"}
              </Button>
            )}
          />
        </form>
      </div>
    </Card>
  );
}
