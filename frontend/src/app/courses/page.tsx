"use client";

import { CoursesContainer } from "@/components/courses";
import { COURSES } from "@/constants/courses";

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      <CoursesContainer courses={COURSES} />
    </div>
  );
}
