export type CardTitleType = {
  title: string;
  description?: string;
};

type CardType = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardType> = ({ children, className = "" }) => {
  return (
    <div
      className={`flex flex-col p-2 shadow-[_-1px_6px_7px_1px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </div>
  );
};

export const CardTitle: React.FC<CardTitleType> = ({ title, description }) => {
  return (
    <Card className="w-full p-5">
      <h4 className="font-bold text-2xl">{title}</h4>
      {description && <p>{description}</p>}
    </Card>
  );
};
