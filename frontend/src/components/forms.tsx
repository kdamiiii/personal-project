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
    <div className={`flex flex-${row ? "row" : "col"} gap-2`}>
      {name && <p>{name}</p>}
      <input type={type} placeholder={placeHolder ?? ""} />
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
