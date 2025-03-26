import { CenterContainter, FlexContainer } from "@/components/containers";
import { ResponsiveImage } from "@/components/images";
import { NavBar } from "@/components/navbar/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
          {/* <NavBar /> */}
          <div
          className="relative w-full"
          style={{
            height: '93vh',
            background: `linear-gradient(to right, white 0%, rgba(255, 255, 255, 0) 70%), url(./student.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'start',
          }}
        >
          {/* Optional: Add content on top of the background */}
          <div className="ml-10 absolute inset-0 flex items-start justify-center flex-col text-blue-950 font-bold text-7xl">
            <p>Be your <span className="text-amber-400">BEST,</span></p>
            <p>Be at <span>BSBT College!</span></p>
          </div>
        </div>
          
          {/* <CenterContainter height="100vh" customClasses="overflow-hidden align-start"> */}
            {/* <FlexContainer customClasses={'flex justify-end align-start h-[93vh]'}>
              <ResponsiveImage alt="logo" src="student.jpg"/>
            </FlexContainer> */}
            {/* <FlexContainer>Panel 2</FlexContainer> */}
          {/* </CenterContainter> */}
      </main>
    </div>
  );
}
