import { CenterContainter, FlexContainer } from "@/components/containers";
import { ResponsiveImage } from "@/components/images";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
          <CenterContainter height="100vh">
            <FlexContainer customClasses={'flex justify-center'}>
              <ResponsiveImage alt="logo" src="bsbt.jpg"/>
            </FlexContainer>
            <FlexContainer>Panel 2</FlexContainer>
          </CenterContainter>
      </main>
    </div>
  );
}
