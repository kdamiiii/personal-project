"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { Table, TableRow } from "@/components/containers";
import { FormInput } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useFetchSubjects } from "@/utils/fetchSubjects";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function Courses() {
  const { isLoading, data, isFetched } = useFetchSubjects();
  const router = useRouter();

  return (
    <Card className="bg-white p-5 h-full overflow-y-scroll">
      <div>
        <div className="flex items-center gap-3">
          <p className="">Search</p>
          <FormInput />
          <Link
            className="ml-auto h-full"
            href="/portal/dashboard/subjects/newsubject"
          >
            <Button className="gap-2">
              New Subject <FaPlus />
            </Button>
          </Link>
        </div>
      </div>
      {!isLoading && !!data && isFetched ? (
        data.length > 0 ? (
          <div className="flex flex-wrap gap-[1%] space-y-[1%] justify-start pt-5">
            <Table
              headers={[
                "Subjet Code",
                "Subject Name",
                "Units",
                "Pre-requisite",
                "Price",
                "Dedicated Course",
              ]}
            >
              {data.map((item) => {
                return (
                  <TableRow
                    border
                    key={item.id}
                    handleClick={() => {
                      router.push(`/portal/dashboard/subjects/${item.id}`);
                    }}
                    tableData={[
                      item.subject_code,
                      item.subject_name,
                      item.units.toString(),
                      item.prereqisite || "None",
                      item.price.toString(),
                      "None",
                    ]}
                  />
                );
              })}
            </Table>
          </div>
        ) : (
          <p>No Data Available</p>
        )
      ) : (
        <div className="flex justify-center w-full pt-5">
          <Spinner />
        </div>
      )}
    </Card>
  );
}
