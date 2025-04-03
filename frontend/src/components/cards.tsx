export type CardTitleType = {
  title: string;
  description?: string;
  footer?: React.ReactNode | undefined;
};

type CardType = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardType> = ({ children, className = "p-2" }) => {
  return (
    <div
      className={`flex flex-col shadow-[_-1px_6px_7px_1px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardTitleType> = ({
  title,
  description,
  footer,
}) => {
  return (
    <Card className={`w-full h-full p-5 text-center`}>
      <h4 className={`font-bold text-[1.3em]`}>{title}</h4>
      {description && (
        <p className="text-[1em] text-gray-700 my-3">{description}</p>
      )}
      {footer}
    </Card>
  );
};

export const CardFooter: React.FC<CardType> = ({ children }) => {
  return <div className="flex flex-col border-t-1 py-3 mt-3">{children}</div>;
};
