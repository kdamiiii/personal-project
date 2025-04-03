"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { FormInput } from "@/components/forms";
import { Step, Stepper } from "@/components/stepper";
import { useRouter } from "next/navigation";
import { useState } from "react";

const steps: Step[] = [
  {
    name: "Student Information",
    complete: false,
  },
  {
    name: "Course",
    complete: false,
  },
  {
    name: "Confirm details",
    complete: false,
  },
];

export default function EnrollmentPage() {
  const [stepsState, setStepsState] = useState(steps);
  const [selected, setSelected] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    const updatedStates = stepsState;
    updatedStates[selected].complete = true;
    setStepsState(updatedStates);
    setSelected((curr) => curr + 1);
  };

  return (
    <Card className="flex flex-col w-[80%] h-[50em] items-center p-0 bg-white">
      <Stepper selected={selected} steps={stepsState} />
      <Button handleOnClickAction={handleNext} className="w-[10em]">
        Next
      </Button>
    </Card>
  );
}
