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

export const Table = () => {
  return (
    <table className="w-full">
      <tr className="border-1">
        <th className=" p-2 border-1">Heading 1</th>
        <th>Heading 2</th>
        <th>Heading 3</th>
      </tr>
      <tr>
        <td>Sample 1</td>
        <td>Sample 1</td>
        <td>Sample 1</td>
      </tr>
      <tr>
        <td>Sample 1</td>
        <td>Sample 1</td>
        <td>Sample 1</td>
      </tr>
    </table>
  );
};
