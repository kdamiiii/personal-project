import { CoursesContainer } from "@/components/courses";
import { FormInput } from "@/components/forms";
import { COURSES } from "@/constants/courses";

export default function Home() {
  return (
    <div className="flex w-screen justify-center">
      <CoursesContainer categories={COURSES} />
    </div>
  );
}
