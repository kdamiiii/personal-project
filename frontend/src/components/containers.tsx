type ContainerType = {
  children: React.ReactNode;
  customClasses?: string;
  height?: string;
};

export const CenterContainter = ({
  children,
  customClasses,
  height,
}: ContainerType) => {
  return (
    <div
      className={`flex justify-center items-center h-[${height}] ${
        customClasses ?? ""
      }`}
    >
      {children}
    </div>
  );
};

export const FlexContainer = ({ children, customClasses }: ContainerType) => {
  return <div className={`w-[100%] ${customClasses ?? ""}`}>{children}</div>;
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

export const TableRow: React.FC<{
  tableData: string[];
  handleClick?: () => void;
}> = ({ tableData, handleClick = () => {} }) => {
  return (
    <tr
      onClick={() => handleClick()}
      className="text-gray-700 text-sm font-normal hover:bg-gray-100 hover:cursor-pointer"
    >
      {tableData.map((data, index) => (
        <td key={index} className="px-4 py-2 whitespace-nowrap">
          {data}
        </td>
      ))}
    </tr>
  );
};
