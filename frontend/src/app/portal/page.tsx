"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { FormInput } from "@/components/forms";
import Link from "next/link";
import { useRouter } from "next/navigation";

const api: string =
  process.env.NEXT_PUBLIC_AUTHENTICATION_API || "localhost:8001";

export default function Home() {
  const router = useRouter();

  const loginAttempt = async () => {
    const data = await fetch(api + "/login", {
      method: "POST",
    });
    console.log(data);
  };

  const goToEnrollmentPage = () => {
    router.push("/enrollment");
  };

  return (
    <Card className="flex-row w-[50%] h-[40em] p-0">
      <div className="flex flex-col gap-10 p-10 w-[40%] justify-center items-center bg-white">
        <h2 className="text-[#003665] text-4xl">Welcome Back!</h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5"
        >
          <FormInput name="Student ID" />
          <FormInput type="password" name="Password" />
          <div className="flex flex-col mt-4 self-center gap-1 items-center w-[90%]">
            <Button handleOnClickAction={loginAttempt} className="w-full">
              Login
            </Button>
            <Link className="w-full" href={"/portal/enrollment"}>
              <Button
                handleOnClickAction={goToEnrollmentPage}
                className="w-full"
                color="bg-gray-400"
              >
                Register
              </Button>
            </Link>
          </div>
        </form>
      </div>
      <div
        className="relative w-[60%]"
        style={{
          backgroundImage: "url('/student.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "90% 10%",
        }}
      ></div>
    </Card>
  );
}
