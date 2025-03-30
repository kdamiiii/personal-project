"use client";

import { CATEGORY_COLOR } from "@/constants/courses";
import { Button } from "./buttons";
import { Card, CardTitle } from "./cards";

export type CourseType = {
  name: string;
  description?: string;
  majors?: string[];
  picture?: string;
  category: string;
};

export type CourseCategoryType = {
  name: string;
  courses: CourseType[];
};

type BadgeType = {
  name: string;
};

export const CoursesContainer: React.FC<{ courses: CourseType[] }> = ({
  courses,
}) => {
  console.log(courses);

  return (
    <div className="w-[90vw] justify-center">
      <Card className="w-full flex-row px-20 py-10 gap-15 justify-center flex-wrap font-normal">
        {courses.map((course) => (
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
      <img src={picture} />
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

const CourseBadge: React.FC<BadgeType> = ({ name }) => {
  return (
    <div
      className={`flex justify-center items-center w-fit p-3 font-bold rounded-t-lg text-white ${CATEGORY_COLOR[name]}`}
    >
      {name}
    </div>
  );
};
