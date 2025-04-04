import { capitalizeFirstLetter } from "@/utils/textUtils";
import { AnyFieldApi } from "@tanstack/react-form";

type FormInputType = {
  name?: string;
  placeHolder?: string;
  type?: string;
  row?: boolean;
};

type CheckBoxType = {
  onToggle: (s: boolean, v: string) => void;
  value: string;
  children: React.ReactNode;
};

export const FormInput: React.FC<FormInputType> = ({
  name,
  placeHolder,
  type = "text",
  row = true,
}) => {
  return (
    <div className={`flex flex-${row ? "row items-center" : "col "}  gap-2`}>
      {name && <p className="w-[30%]">{name}</p>}
      <input
        className="border-1 border-gray-400 rounded-full p-1 px-3 w-[70%]"
        type={type}
        placeholder={placeHolder ?? ""}
      />
    </div>
  );
};

export const CheckBox: React.FC<CheckBoxType> = ({
  onToggle,
  value,
  children,
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="w-6 h-5 appearance-none border-2 border-gray-500 rounded-md checked:bg-blue-500 checked:border-blue-700"
        onChange={(e) => onToggle(e.target.checked, value)}
      />
      {children}
    </div>
  );
};

type OnChangeProps = {
  value: string;
};

type TestFormType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  row?: boolean;
  type?: string;
  placeholder?: string;
  validators: {
    onChange: (value: OnChangeProps) => string | undefined;
    onChangeAsync?: (value: OnChangeProps) => string | undefined;
  };
};

export const TestForm: React.FC<TestFormType> = ({
  form,
  name,
  validators,
  row = false,
  placeholder,
  type = "text",
}) => {
  return (
    <div>
      <form.Field
        name={name}
        validators={{ ...validators, onChangeAsyncDebounce: 500 }}
        // eslint-disable-next-line react/no-children-prop,
        children={(field: AnyFieldApi) => {
          const err =
            field.state.meta.isTouched && field.state.meta.errors.length;

          return (
            <div
              className={`flex flex-${
                row ? "row items-center" : "col "
              }  gap-2 flex-wrap`}
            >
              {name && (
                <label htmlFor={field.name} className="w-[27%]">
                  {capitalizeFirstLetter(name)}
                </label>
              )}
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`border-1 ${
                  err
                    ? "border-red-500 focus:border-red-500 focus:outline focus:outline-red-500"
                    : "border-gray-400 focus:border-[#003665] focus:outline-none"
                } rounded-full p-1 px-3 w-[70%]`}
                type={type}
                placeholder={placeholder ?? ""}
              />
              <div className="w-[27%]"></div>

              <p className="w-[70%] h-3 text-sm text-center font-normal text-red-500">
                <i>{err ? field.name + " is required" : ""}</i>
              </p>
            </div>
          );
        }}
      />
    </div>
  );
};
