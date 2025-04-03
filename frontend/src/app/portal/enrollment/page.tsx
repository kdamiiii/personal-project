"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { FormInput } from "@/components/forms";
import { Step, Stepper } from "@/components/stepper";
import { useRouter } from "next/navigation";

const steps: Step[] = [
  {
    name: "Fill in the details",
    complete: false,
  },
  {
    name: "Select Course",
    complete: false,
  },
  {
    name: "Confirm details",
    complete: false,
  },
];

export default function EnrollmentPage() {
  const router = useRouter();

  const goToEnrollmentPage = () => {
    router.push("/enrollment");
  };

  return (
    <Card className="flex-row w-[50%] h-[40em] p-0 bg-white">
      <Stepper steps={steps} />
    </Card>
  );
}
