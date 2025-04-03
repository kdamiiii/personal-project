export type Step = {
  complete: boolean;
  name: string;
};

type StepperType = {
  steps: Step[];
};

export const Stepper: React.FC<StepperType> = ({ steps }) => {
  return (
    <div className="flex flex-col w-full px-10 items-center justify-center">
      <div className="flex">
        {steps.map(({ name, complete }, index) => {
          return (
            <div className="flex flex-row items-center" key={name}>
              <div
                className={`w-[5em] h-[5em] flex justify-center items-center ${
                  complete
                    ? "bg-[#003665] text-white"
                    : "border-2 border-gray-300 text-gray-300"
                } rounded-full`}
              >
                <p className="text-3xl">{index + 1}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-[10em] h-[0.3em] bg-gray-300" />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex">
        {steps.map((step, index) => {
          return (
            <div className="flex items-center" key={`${step.name}-text`}>
              <div className="w-[5em] h-[5em] flex justify-center text-center font-normal items-center bg-[rgba(0,0,0,0)] rounded-full text-gray-500">
                {step.name}
              </div>
              {index < steps.length - 1 && (
                <div className="w-[10em] h-[0.3em] text-[rgba(0,0,0,0)]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
