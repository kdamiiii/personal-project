"use client";

import { Card } from "@/components/cards";
import { CheckBox, TestForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { useFetchEnrollmentDetails } from "@/utils/fetchEnrollmentData";
import { use } from "react";
import { Button } from "@/components/buttons";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { useRouter } from "next/navigation";
import { CourseSection } from "../../enrollment/requests/[id]/courseSection";
import { useForm } from "@tanstack/react-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const CoursePage: React.FC<Props> = ({ params }: Props) => {
  const unwrappedParams = use(params);
  const { isLoading, data, isFetched } = useFetchEnrollmentDetails(
    unwrappedParams.id
  );

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      student_id: "",
      status: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(
          `${apiHostname}/enrollment_details/${unwrappedParams.id}/`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              status: value.status,
              student_id: value.student_id,
              modifier: "status",
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
        router.push("/portal/dashboard/subjects");
      } catch (e) {
        console.log(e);
      }
    },
  });

  //   const handleSubmit = async (status: string, enrollmentId: string) => {
  //     const res = await fetch(
  //       `${apiHostname}/enrollment_details/${enrollmentId}/`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           modifier: "status",
  //           status,
  //         }),
  //       }
  //     );

  //     if (!res.ok) {
  //       const errorData = await res.json();
  //       throw new RequestError(
  //         errorData.status,
  //         errorData.message || "Something went wrong"
  //       );
  //     }
  //     router.push("/portal/dashboard/enrollment/requests");
  //   };

  return (
    <div className="w-full h-full">
      {!isLoading && isFetched && !!data ? (
        <div className=" flex h-full overflow-y-scroll flex-row gap-5 p-5">
          <Card className="bg-white px-7 py-10 w-4xl overflow-y-scroll">
            <div className="flex flex-col w-full justify-center">
              <div className="flex w-full">
                <div className="flex w-60%">
                  <div className="flex justify-center items-center h-20">
                    <img
                      className="w-full h-full"
                      src="http://localhost:3000/bsbt.jpg"
                      alt="BSBT LOGO"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xl">BSBT COLLEGE</div>
                    <div className="">434 Magsaysay Ave. Baguio City 2600</div>
                    <div className="">Contact No.: (074) 442-2986</div>
                  </div>
                </div>
                <div className="flex flex-col text-right justify-end ml-auto">
                  <div className="text-3xl">Registration Form</div>
                  <div>Please PRINT all entries.</div>
                </div>
              </div>
              <div className="border-2 mb-1" />
              <div className="flex">
                <div className="flex gap-1 font-normal">
                  <CheckBox isChecked>NEW STUDENT</CheckBox>
                  <CheckBox>OLD STUDENT</CheckBox>
                  <CheckBox>CROSS ENROLEE</CheckBox>
                </div>
                <div className="flex gap-1 ml-auto font-normal">
                  <CheckBox isChecked>FIRST SEM</CheckBox>
                  <CheckBox>SECOND SEM</CheckBox>
                  <CheckBox>SUMMER</CheckBox>
                </div>
              </div>
              <div className="flex ml-auto text-xl">SCHOOL YEAR 2025-2026</div>
              <div className="flex justify-center w-full text-2xl">
                PERSONAL INFORMATION
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[30%] items-center">
                  <div>{data.last_name}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold">Family Name</div>
                </div>
                <div className="flex flex-col w-[30%] items-center">
                  <div>{data.first_name}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold">Given Name</div>
                </div>
                <div className="flex flex-col w-[30%] justify-end items-center">
                  <div>{data.middle_name}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold">Middle Name</div>
                </div>
                <div className="flex flex-col w-[10%] items-center">
                  <div>{data.suffix}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold">Ext (Jr.I,II)</div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[80%] items-center">
                  <div>{data.city_address}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">City Address</div>
                </div>
                <div className="flex flex-col w-[20%] items-center">
                  <div>{data.contact_number}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Contact Number
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[80%] items-center">
                  <div>{data.city_address}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Provincial Address
                  </div>
                </div>
                <div className="flex flex-col w-[10%] items-center">
                  <div>19</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">Age</div>
                </div>
                <div className="flex flex-col w-[10%] items-center">
                  <div>{data.sex == "M" ? "Male" : "Femail"}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">Sex</div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[30%] items-center">
                  <div>{data.birth_place}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Place of birth
                  </div>
                </div>
                <div className="flex flex-col w-[24%] items-center">
                  <div>{new Date(data.birth_date).toLocaleDateString()}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Date of birth
                  </div>
                </div>
                <div className="flex flex-col w-[24%] items-center">
                  <div>{data.religious_affiliation}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Religious Affiliation
                  </div>
                </div>
                <div className="flex flex-col w-[21%] items-center">
                  <div>{data.civil_status}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">Civil Status</div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[30%] items-center">
                  <div>{data.Parent_Details?.father_name}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    {`Father's Name`}
                  </div>
                </div>
                <div className="flex flex-col w-[70%] items-center">
                  <div>{`${data.Parent_Details.father_occupation} - ${data.Parent_Details.father_address}`}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Occupation and Address
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[30%] items-center">
                  <div>{data.Parent_Details?.mother_name}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    {`Mother's Name`}
                  </div>
                </div>
                <div className="flex flex-col w-[70%] items-center">
                  <div>{`${data.Parent_Details.mother_occupation} - ${data.Parent_Details.mother_address}`}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Occupation and Address
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[40%] items-center">
                  <div>{data.Parent_Details?.guardian_name}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Name of Guardian
                  </div>
                </div>
                <div className="flex flex-col w-[30%] items-center">
                  <div>{data.Parent_Details?.guardian_relationship}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">Relationship</div>
                </div>
                <div className="flex flex-col w-[30%] items-center">
                  <div>
                    {data.Parent_Details?.guardian_contact_number || "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Contact Number/s
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[70%] items-center">
                  <div>-</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Name of Employer if employed or Name of Business if
                    self-employed
                  </div>
                </div>
                <div className="flex flex-col w-[30%] items-center">
                  <div>-</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Your Position
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[70%] items-center">
                  <div>-</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">Address</div>
                </div>
                <div className="flex flex-col w-[30%] items-center">
                  <div>-</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Contact No. of Business
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4 w-full text-2xl">
                EDUCATIONAL BACKGROUND
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[80%] items-center">
                  <div>{data.Schools_Details[0]?.elementary_school ?? "-"}</div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Elementary: Name and Address of School
                  </div>
                </div>
                <div className="flex flex-col w-[20%] items-center">
                  <div>
                    {data.Schools_Details[0]?.elementary_year_graduated ?? "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Year Graduated
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[80%] items-center">
                  <div>
                    {data.Schools_Details[0]?.junior_high_school ?? "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Junior High School: Name and Address of School
                  </div>
                </div>
                <div className="flex flex-col w-[20%] items-center">
                  <div>
                    {data.Schools_Details[0]
                      ?.junior_high_school_year_graduated ?? "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Year Graduated
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[80%] items-center">
                  <div>
                    {data.Schools_Details[0]?.senior_high_school ?? "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Seinor High School: Name and Address of School
                  </div>
                </div>
                <div className="flex flex-col w-[20%] items-center">
                  <div>
                    {data.Schools_Details[0]
                      ?.senior_high_school_year_graduated ?? "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Inclusive Years
                  </div>
                </div>
              </div>
              <div className="flex gap-1 items-end font-normal">
                <div className="flex flex-col w-[80%] items-center">
                  <div>
                    {data.Schools_Details[0]?.last_school_attended ?? "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Last School Attended: Name and Address of School
                  </div>
                </div>
                <div className="flex flex-col w-[20%] items-center">
                  <div>
                    {data.Schools_Details[0]?.last_school_attended_year ?? "-"}
                  </div>
                  <div className="border-t-2 w-full" />
                  <div className="font-bold text-left w-full">
                    Inclusive Years
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <div className="flex flex-col gap-5">
            <CourseSection enrollmentId={data.courses[0].id} />
            <Card className="bg-white p-5">
              <div className="text-xl mb-5">FACULTY NOTES</div>
              <span className="w-full mx-auto font-normal">
                No notes for this student
              </span>
            </Card>
            <Card className="bg-white p-5">
              <div className="text-xl mb-5">ENROLLMENT REQUEST</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const buttonPressed = (e.nativeEvent as SubmitEvent)
                    .submitter as HTMLButtonElement;
                  form.setFieldValue("status", buttonPressed.value);
                  form.handleSubmit();
                }}
                className="flex flex-col gap-5 w-full"
              >
                <TestForm
                  form={form}
                  row
                  label="Student ID"
                  placeHolder="Enter student ID"
                  name="student_id"
                  areaLength="w-full"
                  validators={{
                    onChange: ({ value }) => {
                      return !value ? "Student ID is required" : undefined;
                    },
                  }}
                />
                <div className="flex w-full gap-3">
                  <Button
                    value="APPROVED"
                    type="submit"
                    disabled={data.status === "APPROVED"}
                    className="w-full bg-green-700"
                  >
                    APPROVE
                  </Button>
                  <Button
                    value="DENIED"
                    disabled={data.status === "APPROVED"}
                    className="bg-red-700 w-full"
                  >
                    DENY
                  </Button>
                </div>
                {data.status === "APPROVED" && (
                  <div className="font-normal text-sm text-gray-500 w-full text-center">
                    This was already approved by the registrar
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CoursePage;
