import { CoursesContainer } from "@/components/courses"
import { FormInput } from "@/components/forms"
import { CHED_COURSES } from "@/constants/courses"

export default function Home() {
    return (
        <div className="flex w-screen">
            <CoursesContainer courses={CHED_COURSES} />
        </div>
    )
}