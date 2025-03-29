import { Card, CardTitle } from "./cards";

export type CourseType = {
  name: string;
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
    <div className="flex flex-row w-[80vw] py-5">
      {categories.map(({ name, courses }) => {
        return (
          <Card className="w-full p-5 gap-3.5" key={name}>
            <h1 className="text-3xl">{name}</h1>
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

const Course: React.FC<CourseType> = ({ name, picture }) => {
  return (
    <div className="flex flex-col w-[20em]">
      <img src={picture} />
      <CardTitle title={name} />
    </div>
  );
};
