"use client";

import { CATEGORY_COLOR } from "@/constants/courses";
import { Button } from "./buttons";
import { Card, CardTitle } from "./cards";
import { CheckBox } from "./forms";
import { useEffect, useState } from "react";
import { CourseTypeEnum } from "@/utils/fetchCourseData";
import Image from "next/image";
import Link from "next/link";
import { Table } from "./containers";

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
  }, [selectedOptions]);

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
      className="w-[24%] flex h-[10em] bg-[#003665] text-white hover:bg-[#6680af] transition-all"
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
  subjectName?: string;
};

export const CourseSubjects: React.FC<CourseSubjectstype> = () => {
  return (
    <div>
      <Table />
    </div>
  );
};
