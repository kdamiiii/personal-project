/* eslint-disable react/no-children-prop */
import { AnyFieldApi } from "@tanstack/react-form";

type FormInputType = {
  name?: string;
  placeHolder?: string;
  type?: string;
  row?: boolean;
  textarea?: boolean;
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
  label?: string;
  placeHolder?: string;
  textarea?: boolean;
  validators?: {
    onChange: (value: OnChangeProps) => string | undefined;
    onChangeAsync?: (value: OnChangeProps) => string | undefined;
  };
};

export const TestForm: React.FC<TestFormType> = ({
  form,
  name,
  validators,
  row = false,
  placeHolder,
  label = name,
  textarea = false,
  type = "text",
}) => {
  return (
    <div>
      <form.Field
        name={name}
        validators={{ ...validators, onChangeAsyncDebounce: 500 }}
        children={(field: AnyFieldApi) => {
          const err =
            field.state.meta.isTouched && field.state.meta.errors.length;

          return (
            <div
              className={`flex flex-${
                row && !textarea ? "row items-center" : "col "
              }  gap-2 flex-wrap`}
            >
              {name && (
                <label
                  htmlFor={field.name}
                  className={`${textarea ? "w-full" : "w-[27%]"}`}
                >
                  {label}
                </label>
              )}

              {textarea ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`border-1 font-normal ${
                    err
                      ? "border-red-500 focus:border-red-500 focus:outline focus:outline-red-500"
                      : "border-gray-400 focus:border-[#003665] focus:outline-none"
                  } p-1 px-3 h-[10em] rounded-2xl w-[100%] text-left align-top`}
                  placeholder={placeHolder ?? ""}
                />
              ) : (
                <>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`border-1 font-normal ${
                      err
                        ? "border-red-500 focus:border-red-500 focus:outline focus:outline-red-500"
                        : "border-gray-400 focus:border-[#003665] focus:outline-none"
                    } p-1 px-3 rounded-full w-[70%]`}
                    type={type}
                    placeholder={placeHolder ?? ""}
                  />
                  <div className="w-[27%]"></div>
                </>
              )}

              <p
                className={`${
                  textarea ? "w-full" : "w-[70%]"
                } h-3 text-sm text-center font-normal text-red-500`}
              >
                <i>{err ? label + " is required" : ""}</i>
              </p>
            </div>
          );
        }}
      />
    </div>
  );
};

type DropDownFormType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  values: string[];
  name: string;
  row?: boolean;
  label?: string;
  validators: {
    onChange: (value: OnChangeProps) => string | undefined;
    onChangeAsync?: (value: OnChangeProps) => string | undefined;
  };
};
export const DropDown = ({
  form,
  values,
  name,
  label = "Category",
}: DropDownFormType) => {
  return (
    <form.Field
      name={name}
      children={(field: AnyFieldApi) => {
        return (
          <div className="flex gap-2 items-center">
            <label className="font-bold block mb-1 w-[27%]">{label}</label>
            <select
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-[70%] font-normal p-1 px-3 rounded-full border-1 border-gray-400"
            >
              <option value="">Select a category</option>
              {values.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        );
      }}
    />
  );
};
