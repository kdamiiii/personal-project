"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { DropDown, TestForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import {
  educationalBackgroundForms,
  enrollmentForms,
  parentForms,
} from "@/constants/enrollment";
import { apiHostname, RequestError } from "@/constants/generalTypes";
import { useFetchCourses } from "@/utils/fetchCourseData";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

export default function Enrollment() {
  const router = useRouter();
  const { data, error, isLoading } = useFetchCourses();

  const def: Record<string, string> = { courseId: "Select Course" };

  const defaultValues = {
    ...enrollmentForms.reduce((acc: Record<string, string>, curr) => {
      acc[curr.fieldName] = curr.defaultValue;
      return acc;
    }, {}),
    ...parentForms.reduce((acc: Record<string, string>, curr) => {
      acc[curr.fieldName] = curr.defaultValue;
      return acc;
    }, {}),
    ...educationalBackgroundForms.reduce(
      (acc: Record<string, string>, curr) => {
        acc[curr.fieldName] = curr.defaultValue;
        return acc;
      },
      {}
    ),
    ...def,
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      const courseId = data?.find(
        (course) => course.course_name === value.courseId
      )?.id;

      try {
        const res = await fetch(apiHostname + "/enrollment_details", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            enrollment_details: {
              first_name: value.firstName,
              last_name: value.lastName,
              middle_name: value.middleName,
              suffix: value.suffix,
              email: value.email,
              city_address: value.cityAddress,
              contact_number: value.contactNumber,
              provincial_address: value.provincialAddress,
              sex: value.sex[0].toUpperCase(),
              birth_place: value.birthPlace,
              birth_date: value.birthDate,
              religous_affiliation: value.religiousAffiliation,
              civil_status: value.civilStatus.toUpperCase(),
            },
            educational_background: {
              elementary_school: value.elementarySchool,
              elementaryYearGraduated: value.elementaryYearGraduated,
              junior_high_school: value.juniorHighSchool,
              junior_high_school_year_graduated:
                value.juniorHighSchoolYearGraduated,
              senior_high_school: value.seniorHighSchool,
              senior_high_school_year_graduated:
                value.seniorHighSchoolYearGraduated,
              last_school_attended: value.lastSchoolAttended,
              last_school_attended_year_graduated:
                value.lastSchoolAttendedYearGraduated,
            },
            parents_details: {
              father_name: value.fatherName,
              father_occupation: value.fatherOccupation,
              father_contact_number: value.fatherContactNumber,
              father_address: value.fatherAddress,
              mother_name: value.motherName,
              mother_occupation: value.motherOccupation,
              mother_contact_number: value.motherContactNumber,
              mother_address: value.motherAddress,
              guardian_name: value.guardianName,
              guardian_occupation: value.guardianOccupation,
              guardian_contact_number: value.guardianContactNumber,
              guardian_relationship: value.guardianRelationship,
              guardian_address: value.guardianAddress,
            },
            course_id: courseId,
          }),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new RequestError(
            errorData.status,
            errorData.message || "Something went wrong"
          );
        }
        router.push("/portal/dashboard/courses");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <Card className="flex overflow-y-scroll p-20 bg-white flex-col gap-5">
      <div className="flex items-center gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-wrap justify-between w-[100%] gap-5"
        >
          <h2 className="text-2xl w-full">Fill up student information</h2>
          {enrollmentForms.map((obj) => (
            <div
              key={obj.fieldName}
              className={`flex ${obj.containerLength ?? "flex-1"}`}
            >
              {obj.formType === "select" && obj.label && obj.options ? (
                <DropDown
                  form={form}
                  name={obj.fieldName}
                  label={obj.label}
                  placeHolder={`Enter ${obj.label}`}
                  values={obj.options}
                  arealength="w-full"
                  validators={
                    obj.required
                      ? {
                          onChange: ({ value }) => {
                            return !value
                              ? `${obj.label} is required`
                              : undefined;
                          },
                        }
                      : undefined
                  }
                />
              ) : obj.formType === "textarea" ? (
                <TestForm
                  form={form}
                  name={obj.fieldName}
                  label={obj.label}
                  type={obj.formType}
                  areaLength="w-full"
                  placeHolder={`Enter ${obj.label}`}
                  validators={
                    obj.required
                      ? {
                          onChange: ({ value }) => {
                            return !value
                              ? `${obj.label} is required`
                              : undefined;
                          },
                        }
                      : undefined
                  }
                />
              ) : (
                <TestForm
                  form={form}
                  name={obj.fieldName}
                  label={obj.label}
                  type={obj.formType}
                  areaLength="w-full"
                  placeHolder={`Enter ${obj.label}`}
                  validators={
                    obj.required
                      ? {
                          onChange: ({ value }) => {
                            return !value
                              ? `${obj.label} is required`
                              : undefined;
                          },
                        }
                      : undefined
                  }
                />
              )}
            </div>
          ))}
          <div className="w-full border-b-2" />

          <h2 className="text-2xl w-full">Parent / Guardian information</h2>
          {parentForms.map((obj) => (
            <div
              key={obj.fieldName}
              className={`flex ${obj.containerLength ?? "flex-1"}`}
            >
              <TestForm
                form={form}
                type={obj.formType}
                name={obj.fieldName}
                label={obj.label}
                areaLength="w-full"
                placeHolder={`Enter ${obj.label}`}
                validators={
                  obj.required
                    ? {
                        onChange: ({ value }) => {
                          return !value
                            ? `${obj.label} is required`
                            : undefined;
                        },
                      }
                    : undefined
                }
              />
            </div>
          ))}
          <div className="w-full border-b-2" />
          <h2 className="text-2xl w-full">Educational Background</h2>
          {educationalBackgroundForms.map((obj) => (
            <div
              key={obj.fieldName}
              className={`flex ${obj.containerLength ?? "flex-1"}`}
            >
              <TestForm
                form={form}
                name={obj.fieldName}
                label={obj.label}
                type={obj.formType}
                areaLength="w-full"
                placeHolder={`Enter ${obj.label}`}
                validators={
                  obj.required
                    ? {
                        onChange: ({ value }) => {
                          return !value
                            ? `${obj.label} is required`
                            : undefined;
                        },
                      }
                    : undefined
                }
              />
            </div>
          ))}
          <div className="w-full border-b-2" />
          <h2 className="text-2xl w-full">Course Selection</h2>
          {isLoading ? (
            <Spinner />
          ) : (
            <DropDown
              form={form}
              name="courseId"
              label="Select Course"
              placeHolder="Select Course"
              values={data?.map((course) => course.course_name) ?? []}
              arealength="w-full"
              validators={{
                onChange: ({ value }) => {
                  return value == "Select Course"
                    ? "Course is required"
                    : undefined;
                },
              }}
            />
          )}
          {error && <p className="text-red-500">{error.message}</p>}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            // eslint-disable-next-line react/no-children-prop
            children={([canSubmit, isSubmitting]) => (
              <Button disabled={!canSubmit} type="submit" className="w-full">
                {isSubmitting ? <Spinner /> : "Create New Course"}
              </Button>
            )}
          />
        </form>
      </div>
    </Card>
  );
}
