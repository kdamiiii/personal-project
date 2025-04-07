"use client";

import { Button } from "@/components/buttons";
import { Card } from "@/components/cards";
import { FormInput } from "@/components/forms";
import { Step, Stepper } from "@/components/stepper";
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
  const handleBack = () => {
    if (selected > -1) {
      const updatedStates = stepsState;
      updatedStates[selected].complete = false;
      setStepsState(updatedStates);
    }
    setSelected((curr) => (selected > -1 ? curr - 1 : curr));
  };

  const handleNext = () => {
    if (selected < stepsState.length) {
      const updatedStates = stepsState;
      updatedStates[selected].complete = true;
      setStepsState(updatedStates);
    }
    setSelected((curr) => curr + 1);
  };

  return (
    <Card className="flex flex-col w-[80%] h-[50em] items-center p-10 gap-6 bg-white">
      <Stepper selected={selected} steps={stepsState} />
      <form className="flex flex-wrap w-full gap-5 justify-center">
        <FormInput name="First Name" />
        <FormInput name="Last Name" />
        <FormInput name="Middle Name" />
      </form>
      <div className="flex gap-2 mt-auto">
        <Button handleOnClickAction={handleBack} className="w-[10em]">
          Back
        </Button>
        <Button handleOnClickAction={handleNext} className="w-[10em]">
          Next
        </Button>
      </div>
    </Card>
  );
}
