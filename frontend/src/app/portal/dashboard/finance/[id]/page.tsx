"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { useFetchEnrollmentDetails } from "@/utils/fetchEnrollmentData";
import { useRouter } from "next/navigation";
import { use } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const PaymentForm: React.FC<Props> = ({ params }) => {
  const unwrappedParams = use(params);
  const { isLoading, data, isFetched } = useFetchEnrollmentDetails(
    unwrappedParams.id
  );

  const router = useRouter();

  const handleSubmit = async (status: string, enrollmentId: string) => {
    const res = await fetch(
      `${apiHostname}/enrollment_details/${enrollmentId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modifier: "finance_status",
          status,
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new RequestError(
        errorData.status,
        errorData.message || "Something went wrong"
      );
    }
    router.push("/portal/dashboard/enrollment/requests");
  };

  return (
    <div className="flex w-full overflow-y-scroll gap-5 justify-start">
      <div className="w-3xl overflow-y-scroll p-6 bg-white text-black font-sans space-y-6">
        <h2 className="text-center text-xl font-bold">PAYMENT FORM</h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Student’s ID number:</div>
          <div>Course and Year:</div>
          <div>Student’s Name:</div>
          <div>SY Term:</div>
        </div>

        <h3 className="font-semibold mt-4">ASSESSMENT OF FEES</h3>
        <div className="grid grid-cols-2 gap-y-2 gap-x-8">
          <LabelledLine label="Tuition Fees" />
          <LabelledLine label="Laboratory Fees" />
          <LabelledLine label="Miscellaneous Fees" />
          <LabelledLine label="Graduation Fees" />
          <LabelledLine label="Uniforms" />
          <LabelledLine label="Driving Fee" />
          <LabelledLine label="Affiliation Fee" />
          <LabelledLine label="Other 1" />
          <LabelledLine label="Other 2" />
        </div>

        <div className="border-t border-b py-2 text-sm">
          <div className="flex justify-between">
            <span>Total Fees</span>
            <span>______________</span>
          </div>
          <div className="flex justify-between">
            <span>Less: Discount</span>
            <span>______________</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Net Amount Due</span>
            <span>______________</span>
          </div>
        </div>

        <div className="text-sm">
          {[
            "Down Payment",
            "2nd Payment",
            "3rd Payment",
            "4th Payment",
            "5th Payment",
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between">
              <span>{item}</span>
              <span>PHP __________</span>
            </div>
          ))}
        </div>

        <div className="text-center text-sm mt-6">Assessed by</div>

        <div>
          <h4 className="font-semibold text-sm mt-6">
            Record of Student Account
          </h4>
          <table className="w-full text-sm mt-2 border border-black border-collapse">
            <thead>
              <tr className="border border-black">
                {[
                  "Date",
                  "OR No.",
                  "Charges",
                  "Payments",
                  "Balance",
                  "Cashier",
                ].map((header) => (
                  <th
                    key={header}
                    className="border border-black px-2 py-1 text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(6)].map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-black px-2 py-1 h-8"
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {!isLoading && !!data && isFetched && (
        <Card className="bg-white p-5 h-fit">
          <div className="text-xl mb-5">ENROLLMENT REQUEST</div>
          <div className="flex w-full gap-3">
            <Button
              disabled={data.finance_status === "APPROVED"}
              handleOnClickAction={() => handleSubmit("APPROVED", data.id)}
              className="w-full bg-green-700"
            >
              APPROVE
            </Button>
            <Button
              disabled={data.finance_status === "APPROVED"}
              handleOnClickAction={() => handleSubmit("DENIED", data.id)}
              className="bg-red-700 w-full"
            >
              DENY
            </Button>
          </div>
          {data.finance_status === "APPROVED" && (
            <div className="font-normal text-sm text-gray-500 w-full text-center">
              This was already approved by an academic head
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

function LabelledLine({ label }: { label: string }) {
  return (
    <div className="flex justify-between items-end">
      <span>{label}</span>
      <span className="border-b text-center border-black w-1/2 inline-block">
        9200
      </span>
    </div>
  );
}

export default PaymentForm;
