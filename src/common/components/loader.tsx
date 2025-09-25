import { ClipLoader } from "react-spinners";

type LoaderProps = {
  size?: number;
  color?: string;
  className?: string;
};

export default function Loader({ size = 28, color = "#0f1724", className = "" }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ClipLoader size={size} color={color} />
    </div>
  );
}

