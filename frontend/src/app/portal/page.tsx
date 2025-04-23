/* eslint-disable react/no-children-prop */
"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { TestForm } from "@/components/forms";
import { Spinner } from "@/components/spinner";
import { RequestError } from "@/constants/generalTypes";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const api: string = process.env.NEXT_PUBLIC_HOST || "http://localhost:8001";

export default function Home() {
  const router = useRouter();
  const [requestError, setRequestError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setRequestError(null);
      try {
        const res = await fetch(api + "/authentication/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: value.username,
            password: value.password,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new RequestError(
            errorData.status,
            errorData.message || "Something went wrong"
          );
        }

        // const data = await res.json();
        router.push("/portal/dashboard");
      } catch (e) {
        if (e instanceof RequestError) {
          if (e.message) {
            setRequestError(e.message);
          }
          return;
        }

        setRequestError("Something went wrong, please try again.");
      }
    },
  });

  const goToEnrollmentPage = () => {
    router.push("/enrollment");
  };

  return (
    <Card className="flex-row w-[50%] h-[40em] p-0">
      <div className="flex flex-col gap-10 p-10 w-[40%] justify-center items-center bg-white">
        <h2 className="text-[#003665] text-4xl">Welcome Back!</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-col gap-5"
        >
          <TestForm
            form={form}
            row
            name="username"
            label="Username"
            areaLength="w-full"
            validators={{
              onChange: ({ value }) => {
                return !value ? "User name is required" : undefined;
              },
            }}
          />
          <TestForm
            form={form}
            row
            type="password"
            name="password"
            label="Password"
            areaLength="w-full"
            validators={{
              onChange: ({ value }) => {
                return !value ? "User name is required" : undefined;
              },
            }}
          />
          <div className="flex flex-col mt-4 self-center gap-1 items-center w-[90%]">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button disabled={!canSubmit} type="submit" className="w-full">
                  {isSubmitting ? <Spinner size={22} /> : "Login"}
                </Button>
              )}
            />

            <Link className="w-full" href={"/portal/enrollment"}>
              <Button
                handleOnClickAction={goToEnrollmentPage}
                className="w-full"
                color="bg-gray-400"
              >
                Register
              </Button>
            </Link>
            <p className="w-full h-3 text-sm text-center font-normal text-red-500">
              <i>{requestError}</i>
            </p>
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
