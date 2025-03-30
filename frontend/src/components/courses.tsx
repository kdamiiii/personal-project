"use client";

import { Button } from "./buttons";
import { Card, CardFooter, CardTitle } from "./cards";

export type CourseType = {
  name: string;
  description?: string;
  majors?: string[];
  picture?: string;
};

export type CourseCategoryType = {
  name: string;
  courses: CourseType[];
};

type CoursesContainerProps = {
  categories: CourseCategoryType[];
};

export const CoursesContainer: React.FC<CoursesContainerProps> = ({
  categories,
}) => {
  return (
    <div className="flex flex-row w-[90vw] py-5">
      {categories.map(({ name, courses }) => {
        return (
          <Card className="w-full px-20 py-10  gap-3.5" key={name}>
            <div className="flex justify-items-start w-full gap-15 font-normal">
              {courses.map((course) => (
                <Course key={course.name} {...course} />
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const Course: React.FC<CourseType> = ({
  name,
  picture,
  description,
  majors,
}) => {
  const handleClick = () => {};

  return (
    <div className="flex flex-col w-[20em] h-full">
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
