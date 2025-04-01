"use client";

import { CoursesContainer } from "@/components/courses";
import { COURSES } from "@/constants/courses";

export default function Home() {
  return (
    <div className="flex justify-center w-full pt-3">
      <CoursesContainer courses={COURSES} />
    </div>
  );
}
