"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { Spinner } from "@/components/spinner";
import { ClassesProps } from "@/types/pagestypes";
import { to12HourFormat } from "@/utils/dateUtils";
import { useFetchClass } from "@/utils/fetchClassData";
import { useRouter } from "next/navigation";
import { use } from "react";

const ClassPage: React.FC<ClassesProps> = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  const { isLoading, data, isFetched } = useFetchClass(id);

  return (
    <>
      {isLoading && !data && !isFetched ? (
        <Spinner />
      ) : (
        <>
          <Card className="flex-col gap-2 my-4 p-5 bg-white max-w-3xl">
            <div className="flex items-center">
              <h2 className="text-3xl text-gray-900">
                [{data?.subjectCode}] {data?.subjectName}
              </h2>
              <Button
                className="ml-auto w-[5em] h-[2em]"
                handleOnClickAction={() => {
                  router.push(`/portal/dashboard/classes/${id}/edit`);
                }}
              >
                Edit
              </Button>
            </div>
            <h2 className="text-gray-600 text-lg ">
              Class Code: {data?.classCode}
            </h2>
            <h2 className="text-gray-600 text-lg ">
              Schedule: {data?.schedule || "No Schedule"} ·{" "}
              {to12HourFormat(data?.timeStart || "")} -{" "}
              {to12HourFormat(data?.timeEnd || "")}
            </h2>
            <h2 className="text-gray-600 text-lg ">
              Instructor: {data?.instructorName}
            </h2>
            <h2 className="text-gray-600 text-lg ">
              Room: {data?.room || "N/A"}
            </h2>
            <h2 className="text-gray-600 text-lg ">Units: {data?.units}</h2>
            <h2 className="text-gray-600 text-lg ">
              Active: {data?.active ? "Yes" : "No"}
            </h2>
          </Card>
        </>
      )}
    </>
  );
};

export default ClassPage;
