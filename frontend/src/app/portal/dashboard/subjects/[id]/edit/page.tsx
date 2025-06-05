"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { TestForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { SubjectProps } from "@/types/pagestypes";
import { useFetchSubject } from "@/utils/fetchSubjects";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { use } from "react";

const EditSubjects: React.FC<SubjectProps> = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);

  const { isLoading, data, isFetched } = useFetchSubject(id);

  const form = useForm({
    defaultValues: {
      subjectName: data?.subjectName || "",
      subjectCode: data?.subjectCode || "",
      subjectDescription: data?.subjectDescription || "",
      units: data?.units || 0,
      prerequisite: data?.prerequisite || "",
      price: data?.price || 0,
    },
    onSubmit: async ({ value }) => {
      try {
        const newValue = { ...value };

        console.log(data, value);

        //WHAT A DOG IMPLEMENTATION 🐶🐶🐶🐶
        if (data) {
          for (const val in newValue) {
            if (
              newValue[val as keyof typeof newValue] ===
              data[val as keyof typeof data]
            ) {
              delete newValue[val as keyof typeof newValue];
            }
          }
        }

        console.log(newValue);

        if (Object.keys(newValue).length > 0) {
          const res = await fetch(`${apiHostname}/subjects/${id}/`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newValue),
          });

          if (!res.ok) {
            const errorData = await res.json();
            throw new RequestError(
              errorData.status,
              errorData.message || "Something went wrong"
            );
          }

          router.push("/portal/dashboard/subjects");
        } else {
          alert("Nothing to update");
        }
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <>
      {isLoading && !data && !isFetched ? (
        <Spinner />
      ) : (
        <Card className="flex flex-col p-5 h-full overflow-y-scroll bg-white gap-5">
          <h2 className="text-2xl">Update Subject</h2>
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
                    return !value
                      ? "Subject description is required"
                      : undefined;
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
                    return !value
                      ? "Subject description is required"
                      : undefined;
                  },
                }}
              />
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                // eslint-disable-next-line react/no-children-prop
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    disabled={!canSubmit}
                    type="submit"
                    className="w-full"
                  >
                    {isSubmitting ? <Spinner /> : "Update Subject"}
                  </Button>
                )}
              />
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default EditSubjects;
