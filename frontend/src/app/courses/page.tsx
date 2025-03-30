"use client";

import { CoursesContainer } from "@/components/courses";
import { COURSES } from "@/constants/courses";

export default function Home() {
  return (
    <div className="flex w-screen justify-center">
      <CoursesContainer courses={COURSES} />
    </div>
  );
}
