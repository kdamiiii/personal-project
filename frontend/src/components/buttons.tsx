"use client";

export type ButtonProps = {
  children: React.ReactNode;
  handleOnClickAction?: () => void;
  className?: string;
  color?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  handleOnClickAction = () => {},
  className,
  color = "bg-blue-900",
}) => {
  return (
    <button
      onClick={(e) => {
        handleOnClickAction();
      }}
      className={`rounded-full text-white p-3 border-none hover:bg-blue-800 ${color} ${className}`}
    >
      {children}
    </button>
  );
};
