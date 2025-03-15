import { FC } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  /** Additional CSS classes to apply to the spinner */
  className?: string;
  /** Size of the spinner in pixels */
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({ className, size = 24 }) => {
  return <Loader2 className={cn("animate-spin", className)} size={size} />;
};

export default Spinner;
