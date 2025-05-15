"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { Spinner } from "@/components/spinner";
import { useFetchSubject } from "@/utils/fetchSubjects";
import { useRouter } from "next/navigation";
import { use } from "react";

export type SubjectProps = {
  params: Promise<{
    id: string;
  }>;
};

const SubjectPage: React.FC<SubjectProps> = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  const { isLoading, data } = useFetchSubject(id);
  return (
    <>
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <Card className="flex-col gap-2 my-4 p-5 bg-white max-w-3xl">
          <div className="flex">
            <div className="flex flex-col">
              <h2 className="flex gap-2 text-3xl text-gray-900">
                <span className="text-gray-700">[{data?.subjectCode}]</span>
                {data?.subjectName}
              </h2>
              <p className="text-md font-normal">{data?.subjectDescription}</p>
            </div>
            <Button
              className="ml-auto w-[5em] h-[2em]"
              handleOnClickAction={() => {
                router.push(`/portal/dashboard/subjects/${id}/edit`);
              }}
            >
              Edit
            </Button>
          </div>

          <hr />
          <h2 className="text-gray-600 text-lg">Units: {data?.units}</h2>
          <h2 className="text-gray-600 text-lg">
            Prerequisite: {data?.prerequisite || "None"}
          </h2>
          <h2 className="text-gray-600 text-lg">Default Course: {"None"}</h2>
          <h2 className="text-gray-600 text-lg">Price: {data?.price}</h2>
        </Card>
      )}
    </>
  );
};

export default SubjectPage;
