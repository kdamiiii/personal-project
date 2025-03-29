export type CourseType = {
    name:string,
    majors?: string[]
}

type CoursesContainerProps = {
    courses: CourseType[]
}

export const CoursesContainer :React.FC<CoursesContainerProps> = ({courses}) => {
    return (
        <div className="flex w-full justify-between">
            {courses.map((course)=> <Course key={course.name} {...course}/>)}
        </div>
    )
}

const Course : React.FC<CourseType> = ({name}) =>{
    return (
        <div>{name}</div>
    )
}