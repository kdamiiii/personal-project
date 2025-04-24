"use client";

export type ButtonProps = {
  value?: string;
  children: React.ReactNode;
  handleOnClickAction?: () => void;
  className?: string;
  color?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  handleOnClickAction = () => {},
  className,
  color = "bg-[#003665]",
  type = "button",
  disabled = false,
  value,
}) => {
  return (
    <button
      value={value}
      disabled={disabled}
      type={type}
      onClick={() => {
        handleOnClickAction();
      }}
      className={`flex justify-center items-center disabled:bg-[#6d6d6dd5] rounded-full text-white p-3 border-none hover:bg-blue-800 ${color} transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
};
