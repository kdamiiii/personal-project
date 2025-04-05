"use client";

export type ButtonProps = {
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
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={() => {
        handleOnClickAction();
      }}
      className={`flex justify-center items-center disabled:bg-[#003665d5] h-14 rounded-full text-white p-3 border-none hover:bg-blue-800 ${color} ${className} transition-colors duration-200`}
    >
      {children}
    </button>
  );
};
