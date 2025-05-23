/* eslint-disable react/no-children-prop */
import { AnyFieldApi } from "@tanstack/react-form";

type FormInputType = {
  name?: string;
  placeHolder?: string;
  type?: string;
  row?: boolean;
  textarea?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type CheckBoxType = {
  onToggle?: (s: boolean, v: string) => void;
  value?: string;
  children?: React.ReactNode;
  isChecked?: boolean;
};

export const FormInput: React.FC<FormInputType> = ({
  name,
  placeHolder,
  type = "text",
  row = true,
  onChange = () => {},
}) => {
  return (
    <div className={`flex flex-${row ? "row items-center" : "col "}  gap-2`}>
      {name && <p className="w-[30%]">{name}</p>}
      <input
        onChange={onChange}
        className="border-1 border-gray-400 rounded-full p-1 px-3 w-[70%]"
        type={type}
        placeholder={placeHolder ?? ""}
      />
    </div>
  );
};

export const CheckBox: React.FC<CheckBoxType> = ({
  onToggle = () => {},
  value = "",
  children,
  isChecked = false,
}) => {
  return (
    <div className="flex items-center gap-1">
      <input
        checked={isChecked}
        type="checkbox"
        className="w-5 h-5 appearance-none border-2 border-gray-500 rounded-md checked:bg-blue-500 checked:border-blue-700"
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
    onChange: (value: OnChangeProps) => string | number | undefined;
    onChangeAsync?: (value: OnChangeProps) => string | undefined;
  };
  containerLength?: string;
  areaLength?: string;
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
  containerLength = "w-full",
  areaLength = "w-[70%]",
}) => {
  return (
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
            }  gap-2 flex-wrap ${containerLength}`}
          >
            {name && (
              <label
                htmlFor={field.name}
                className={`${textarea ? "w-full" : areaLength}`}
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
                  } p-1 px-3 rounded-full ${areaLength}`}
                  type={type}
                  placeholder={placeHolder ?? ""}
                />
                {(!areaLength || row) && <div className="w-[27%]"></div>}
              </>
            )}

            <p
              className={`${
                textarea || !row ? "w-full" : "w-[70%]"
              } h-3 text-sm text-center font-normal text-red-500`}
            >
              <i>{err ? label + " is required" : ""}</i>
            </p>
          </div>
        );
      }}
    />
  );
};

type DropDownFormType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  values: string[];
  name: string;
  row?: boolean;
  label?: string;
  validators?: {
    onChange: (value: OnChangeProps) => string | undefined;
    onChangeAsync?: (value: OnChangeProps) => string | undefined;
  };
  className?: string;
  width?: string;
  placeHolder?: string;
  arealength?: string;
  containerLength?: string;
};
export const DropDown = ({
  form,
  values,
  name,
  label,
  className = "",
  placeHolder = "",
  arealength = "w-[70%]",
  containerLength = "w-full",
  validators,
  row = false,
}: DropDownFormType) => {
  return (
    <form.Field
      name={name}
      validators={validators}
      children={(field: AnyFieldApi) => {
        const err =
          field.state.meta.isTouched && field.state.meta.errors.length > 0;
        return (
          <div
            className={`flex gap-2 flex-${
              row ? "row items-center" : "col"
            } ${className} ${containerLength}`}
          >
            {label && (
              <label
                htmlFor={field.name}
                className={`${arealength ? arealength : "w-[27%]"}`}
              >
                {label}
              </label>
            )}
            <select
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className={`${arealength} font-normal p-1 px-3 rounded-full border-1 ${
                err ? "border-red-400" : "border-gray-400"
              }`}
            >
              <option disabled>{placeHolder}</option>
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

type CheckBoxFormType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  options: { label: string; value: string }[]; // Array of options with label and value
  row?: boolean;
  label?: string;
  className?: string;
};

export const CheckBoxForm: React.FC<CheckBoxFormType> = ({
  form,
  name,
  options,
  row = false,
  label,
  className = "",
}) => {
  return (
    <form.Field
      name={name}
      children={(field: AnyFieldApi) => {
        return (
          <div
            className={`flex flex-${
              row ? "row" : "col"
            } gap-[3%] items-start ${className}`}
          >
            {label && <label className="font-bold w-[27%] mb-1">{label}</label>}
            <div
              className={`flex flex-wrap gap-4 ${label ? "w-[70%]" : "w-full"}`}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`${name}-${option.value}`}
                    value={option.value}
                    checked={field.state.value.includes(option.value)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...field.state.value, option.value]
                        : field.state.value.filter(
                            (v: string) => v !== option.value
                          );
                      field.handleChange(newValue);
                    }}
                    className="w-5 h-5 appearance-none border-2 border-gray-500 rounded-md checked:bg-blue-500 checked:border-blue-700"
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="font-normal"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};
