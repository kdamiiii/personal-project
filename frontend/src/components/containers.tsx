type ContainerType = {
  children: React.ReactNode;
  className?: string;
  height?: string;
};

export const CenterContainter = ({
  children,
  className,
  height,
}: ContainerType) => {
  return (
    <div
      className={`flex justify-center items-center h-[${height}] ${
        className ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export const FlexContainer = ({ children, className }: ContainerType) => {
  return <div className={`flex w-[100%] ${className ?? ""}`}>{children}</div>;
};

type TableType = {
  children: React.ReactNode;
  headers: string[];
  customClasses?: string;
};

export const Table: React.FC<TableType> = ({ headers, children }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase tracking-wider">
          {headers.map((header, index) => (
            <th key={index} className="px-4 py-2 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const checkStatus = (status: string) => {
  switch (status) {
    case "APPROVED":
      return "rounded-full bg-green-700 text-white p-1.5";
    case "PENDING":
      return "rounded-full bg-amber-500 text-white p-1.5";
    case "DENIED":
      return "rounded-full bg-red-700 text-white p-1.5";
    default:
      return "";
  }
};

export const TableRow: React.FC<{
  ref: React.RefObject<HTMLTableRowElement | null> | null;
  tableData: string[];
  handleClick?: () => void;
  border?: boolean;
}> = ({ tableData, handleClick = () => {}, border = false, ref = null }) => {
  return (
    <tr
      ref={ref}
      onClick={() => handleClick()}
      className={`text-gray-700 text-sm font-normal hover:bg-gray-100 hover:cursor-pointer ${
        border ? "border-b border-b-[#61616146] border-op" : ""
      }`}
    >
      {tableData.map((data, index) => (
        <td key={index} className="px-4 py-2 whitespace-nowrap">
          <span className={`${checkStatus(data)}`}>{data}</span>
        </td>
      ))}
    </tr>
  );
};
