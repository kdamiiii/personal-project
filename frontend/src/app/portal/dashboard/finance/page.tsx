"use client";

import { Card } from "@/components/cards";
import { Table, TableRow } from "@/components/containers";
import { Spinner } from "@/components/spinner";
import { useFetchEnrollmentRequests } from "@/utils/fetchEnrollmentData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EnrollmentRequest: React.FC = () => {
  const { isLoading, data, isFetched } = useFetchEnrollmentRequests();
  const router = useRouter();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Card className="bg-white p-5 h-full overflow-y-scroll">
      <h2 className="text-2xl mb-5">Enrollment Requests</h2>
      {!!data && !isLoading && isFetched ? (
        data.length == 0 ? (
          "No data Available"
        ) : (
          <Table
            headers={[
              "Student",
              "Course",
              "ACADEMIC HEAD",
              "FINANCE",
              "Status",
            ]}
          >
            {data.map((req) => {
              console.log(req);
              return (
                <TableRow
                  key={req.id}
                  tableData={[
                    `${req.first_name} ${req.last_name}`,
                    req.courses[0].course_name,
                    req.ah_status,
                    req.finance_status,
                    req.status,
                  ]}
                  handleClick={() => {
                    router.push(`/portal/dashboard/finance/${req.id}`);
                  }}
                />
              );
            })}
          </Table>
        )
      ) : (
        <Spinner />
      )}
    </Card>
  );
};

export default EnrollmentRequest;
