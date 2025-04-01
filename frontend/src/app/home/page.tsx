"use client";

import { Button } from "@/components/buttons";

export default function Home() {
  const handleClick = () => {};

  return (
    <div className="">
      <main className="">
        {/* <NavBar /> */}
        <div
          className="relative w-full"
          style={{
            height: "93vh",
            background: `linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 70%), url(./student.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "start",
          }}
        >
          <div className="ml-25 w-[45%] absolute gap-5 inset-0 flex items-start justify-center flex-col text-blue-950 font-bold text-8xl">
            <p>
              Be your <span className="text-amber-400">BEST,</span>
              <br />
              Be at <span>BSBT College!</span>
            </p>
            <div className="text-4xl font-normal text-gray-700">
              <p>
                Unlock your potential with expert-led courses designed to ignite
                curiosity and fuel your future!
              </p>
            </div>
            <Button
              handleOnClickAction={handleClick}
              className="mt-5 w-[15em] h-[4em] text-[0.2em]"
            >
              View our Courses
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
