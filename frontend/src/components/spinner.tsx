import { ImSpinner8 } from "react-icons/im";

export const Spinner: React.FC<{ size?: number }> = ({ size = 55 }) => {
  return <ImSpinner8 className="animate-spin" size={size} />;
};
