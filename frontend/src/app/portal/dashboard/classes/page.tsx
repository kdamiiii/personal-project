"use client";

import { Button } from "@/components/buttons";
import { FormInput } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useInfiniteFetchClasses } from "@/utils/fetchClassData";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { Table, TableRow } from "@/components/containers";
import { useRouter } from "next/navigation";
import { Card } from "@/components/cards";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDebounce } from "@/utils/componentUtils";
import { checkScheduleText } from "@/utils/textUtils";

export default function Courses() {
  const router = useRouter();
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);

  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const {
    isLoading,
    data,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteFetchClasses(debouncedValue);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        console.log("Last row is visible");
        fetchNextPage();
      } else {
        console.log("Last row is not visible");
      }
    });

    const currentRef = lastRowRef.current;
    if (currentRef) {
      console.log("Observing", currentRef);
      observer.observe(currentRef);
    } else {
      console.log("No currentRef to observe");
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, isLoading]);

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
        <FormInput onChange={handleChange} />
        <Link
          className="ml-auto h-full"
          href="/portal/dashboard/classes/newclass"
        >
          <Button className="gap-2">
            New Class <FaPlus />
          </Button>
        </Link>
      </div>
      {!!data && !isLoading && !isFetching ? (
        data.pages.length > 0 ? (
          <div className="flex flex-wrap gap-[1%] space-y-[1%] justify-start pt-5">
            <Table headers={headers}>
              {data.pages.map((page, index) => (
                <Fragment key={index}>
                  {page.map((item) => {
                    return (
                      <TableRow
                        ref={null}
                        key={item.id}
                        handleClick={() => {
                          router.push(`/portal/dashboard/classes/${item.id}`);
                        }}
                        tableData={[
                          item.classCode,
                          item.subjectCode,
                          item.units.toString(),
                          item?.instructorName ?? "",
                          `${checkScheduleText(item?.schedule || "")} ${
                            item.timeStart
                          } - ${item.timeEnd}`,
                          item.room || "N/A",
                          item.active ? "Yes" : "No",
                        ]}
                      />
                    );
                  })}
                </Fragment>
              ))}
            </Table>
            <div ref={lastRowRef} className={`w-full flex justify-center`}>
              {isFetchingNextPage ? (
                <Spinner size={15} />
              ) : hasNextPage ? (
                "Load more"
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <p>No Data Available</p>
        )
      ) : (
        <div className="flex justify-center w-full">
          <Spinner />
        </div>
      )}
    </Card>
  );
}
