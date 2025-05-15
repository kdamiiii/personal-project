"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { Table, TableRow } from "@/components/containers";
import { FormInput } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useDebounce } from "@/utils/componentUtils";
import { useFetchSubjects } from "@/utils/fetchSubjects";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function Courses() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (debouncedValue) {
      // Perform the search or API call with debouncedValue
      console.log("Searching for:", debouncedValue);
    }
  }, [debouncedValue]);

  const {
    isLoading,
    data,
    isFetched,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useFetchSubjects(debouncedValue);
  const lastRowRef = useRef<HTMLTableRowElement | null>(null);

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

  return (
    <Card className="bg-white p-5 h-full overflow-y-scroll">
      <div>
        <div className="flex items-center gap-3">
          <p className="">Search</p>
          <FormInput onChange={handleChange} />
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
        data.pages.length > 0 ? (
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
              {data.pages.map((page, index) => (
                <Fragment key={index}>
                  {page.map((item) => {
                    return (
                      <TableRow
                        ref={null}
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
        <div className="flex justify-center w-full pt-5">
          <Spinner />
        </div>
      )}
    </Card>
  );
}
