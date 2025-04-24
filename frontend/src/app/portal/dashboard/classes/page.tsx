"use client";

import { Button } from "@/components/buttons";
import { FormInput } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useFetchClasses } from "@/utils/fetchClassData";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { Table, TableRow } from "@/components/containers";
import { useRouter } from "next/navigation";
import { Card } from "@/components/cards";
import { useEffect } from "react";

export default function Courses() {
  const { isLoading, data, isFetching, error } = useFetchClasses();
  const router = useRouter();

  useEffect(() => {
    console.log("CLASS DATA", data, error);
  }, [data, error]);

  const headers = [
    "Class Code",
    "Subject",
    "Units",
    "Instructor",
    "Schedule",
    "Room",
    "Active",
  ];

  return (
    <Card className="bg-white p-5 h-full overflow-y-scroll">
      <div className="flex items-center gap-3">
        <p className="">Search</p>
        <FormInput />
        <Link
          className="ml-auto h-full"
          href="/portal/dashboard/classes/newclass"
        >
          <Button className="gap-2">
            New Class <FaPlus />
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-[1%] space-y-[1%] justify-start pt-5">
        {!!data && !isLoading && !isFetching ? (
          data.length < 1 ? (
            "No classes available at the moment"
          ) : (
            <Table headers={headers}>
              {data.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    handleClick={() => {
                      router.push(`/portal/dashboard/classes/${item.id}`);
                    }}
                    tableData={[
                      item.classCode,
                      item.subjectCode,
                      item.units.toString(),
                      item?.instructorName ?? "",
                      `${item.schedule} ${item.timeStart} - ${item.timeEnd}`,
                      item.room || "N/A",
                      item.active ? "Yes" : "No",
                    ]}
                  />
                );
              })}
            </Table>
          )
        ) : (
          <div className="flex justify-center w-full">
            <Spinner />
          </div>
        )}
      </div>
    </Card>
  );
}
