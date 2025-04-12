"use client";

import { CATEGORY_COLOR } from "@/constants/courses";
import { Button } from "./buttons";
import { Card, CardTitle } from "./cards";
import { CheckBox, DropDown } from "./forms";
import { useEffect, useState } from "react";
import { CourseTypeEnum } from "@/utils/fetchCourseData";
import Image from "next/image";
import Link from "next/link";
import { Table, TableRow } from "./containers";
import { ModifiedSubjectType, useFetchSubjects } from "@/utils/fetchSubjects";
import { Spinner } from "./spinner";
import { FaPlus } from "react-icons/fa6";
import { useForm } from "@tanstack/react-form";
import { apiHostname, RequestError } from "@/constants/generalTypes";

export type CourseType = {
  name: string;
  description?: string;
  majors?: string[];
  picture: string;
  category: string;
};

export type CourseCategoryType = {
  name: string;
  courses: CourseType[];
};

type BadgeType = {
  name: string;
  fullRound?: boolean;
  width?: string;
};

export const CoursesContainer: React.FC<{ courses: CourseType[] }> = ({
  courses,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState(courses);

  useEffect(() => {
    if (selectedOptions.length == 0) setSelectedCourses(courses);
    else {
      setSelectedCourses(
        courses.filter((c) => selectedOptions.includes(c.category))
      );
    }
  }, [selectedOptions, courses]);

  const onToggle = (isChecked: boolean, value: string) => {
    if (isChecked) setSelectedOptions((s) => [...s, value]);
    else setSelectedOptions((s) => s.filter((option) => option != value));
  };

  return (
    <div className="flex flex-row gap-5 w-[100vw] px-5 justify-center">
      <Card className="w-[15em] h-fit gap-2 p-5">
        <h2>Filters</h2>
        {Object.entries(CATEGORY_COLOR).map((e) => (
          <CheckBox key={e[0]} value={e[0]} onToggle={onToggle}>
            <CourseBadge width="w-full" fullRound name={e[0]} />
          </CheckBox>
        ))}
      </Card>
      <Card className="w-full flex-row px-20 py-10 gap-15 justify-center flex-wrap font-normal">
        {selectedCourses.map((course) => (
          <Course key={course.name} {...course} />
        ))}
      </Card>
    </div>
  );
};

const Course: React.FC<CourseType> = ({
  name,
  picture,
  description,
  category,
}) => {
  const handleClick = () => {
    alert(category);
  };

  return (
    <div className="flex flex-col w-[20em] h-[38em]">
      <CourseBadge name={category} />
      <Image src={picture} alt="picture" />
      <CardTitle
        title={name}
        description={description}
        footer={
          <Button className="mt-auto" handleOnClickAction={handleClick}>
            View Course
          </Button>
        }
      />
    </div>
  );
};

export const CourseBadge: React.FC<BadgeType> = ({
  name,
  fullRound = false,
  width = "w-fit",
}) => {
  return (
    <div
      className={`flex justify-center items-center ${width} p-3 font-bold rounded-t-lg text-white ${
        fullRound && "rounded-b-lg"
      } ${CATEGORY_COLOR[name]}`}
    >
      {name}
    </div>
  );
};

type CourseCardProps = {
  courseName: string;
  courseType: CourseTypeEnum | string;
  link: string;
  id: string;
};

export const CourseCard: React.FC<CourseCardProps> = ({
  courseName,
  courseType,
  link,
  id,
}) => {
  return (
    <Link
      className="w-[24%] flex h-[10em] bg-gradient-to-r from-[#003665] to-[#1774bf] text-white  hover:to-[#1774bf] hover:from-[#1774bf] transition-all duration-500 ease-in-out"
      href={`/portal/dashboard/${link}/${id}`}
    >
      <Card className="flex-col  p-5 gap-2 w-full">
        <p className="text-3xl">{courseName}</p>
        <p className="font-normal">{courseType}</p>
      </Card>
    </Link>
  );
};

type CourseSubjectstype = {
  subjects: ModifiedSubjectType[] | undefined;
};

export const CourseSubjects: React.FC<CourseSubjectstype> = ({ subjects }) => {
  if (!subjects)
    return (
      <p>
        <Spinner />
      </p>
    );
  if (subjects.length == 0) return <p>No subjects available</p>;

  return (
    <div>
      <Table headers={Object.keys(subjects[0]).filter((s) => s != "id")}>
        {subjects.map((subject) => (
          <TableRow
            key={subject.id}
            tableData={[
              subject.subjectCode,
              subject.subjectName,
              subject.subjectDescription,
              subject.units.toString(),
              subject.prerequisite,
            ]}
          />
        ))}
      </Table>
    </div>
  );
};

export const CourseSubjectAdder: React.FC<{
  size: string;
  courseId: string;
}> = ({ size, courseId }) => {
  const [isActive, setIsActive] = useState(false);

  if (!isActive) {
    return (
      <Button
        className={`w-[${size}] h-[${size}]`}
        color="bg-[#3cb54c]"
        handleOnClickAction={() => setIsActive(true)}
      >
        <FaPlus />
      </Button>
    );
  }

  return <SubjectSelector courseId={courseId} />;
};

const SubjectSelector: React.FC<{ courseId: string }> = ({ courseId }) => {
  const { data } = useFetchSubjects();
  const form = useForm({
    defaultValues: {
      subjectName: "Select a subject",
    },
    onSubmit: async ({ value }: { value: { subjectName: string } }) => {
      const subjectId = data?.find(
        (s) => s.subject_name == value.subjectName
      )?.id;
      try {
        const res = await fetch(`${apiHostname}/courses/${courseId}/subjects`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            subjectId,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new RequestError(
            errorData.status,
            errorData.message || "Something went wrong"
          );
        }

        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    console.log(form.state.values);
  }, [form]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col w-[30%]"
    >
      {!!data && (
        <div className="flex gap-2">
          <DropDown
            form={form}
            values={data?.map((s) => s.subject_name)}
            name="subjectName"
            className="max-w-1/2"
            placeHolder="Select a subject"
          />
          <Button
            type="submit"
            color="bg-[#3cb54c]"
            disabled={form.state.isSubmitting}
          >
            <FaPlus />
          </Button>
        </div>
      )}
    </form>
  );
};
