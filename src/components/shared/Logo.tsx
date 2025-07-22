import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  textClassName?: string;
}

const Logo = ({
  className,
  size = "md",
  showText = true,
  textClassName,
}: LogoProps) => {
  const sizeMap = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  const textSizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={cn("relative", sizeMap[size], className)}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#3b82f6"></stop>
              <stop offset="50%" stop-color="#1d4ed8"></stop>
              <stop offset="100%" stop-color="#1e3a8a"></stop>
            </linearGradient>
            <linearGradient
              id="innerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#60a5fa"></stop>
              <stop offset="100%" stop-color="#3b82f6"></stop>
            </linearGradient>
          </defs>
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#logoGradient)"
            className="drop-shadow-lg"
          ></circle>
          <circle
            cx="20"
            cy="20"
            r="15"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.3"
          ></circle>
          <rect
            x="10"
            y="12"
            width="20"
            height="16"
            rx="4"
            fill="url(#innerGradient)"
            opacity="0.8"
          ></rect>
          <g
            stroke="white"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 17 L27 17"></path>
            <path d="M25 15 L27 17 L25 19" fill="white"></path>
            <path d="M27 23 L13 23"></path>
            <path d="M15 21 L13 23 L15 25" fill="white"></path>
          </g>
        </svg>
      </div>
      {showText && (
        <span
          className={cn("font-bold", textSizeMap[size], textClassName)}
          style={{
            background: "linear-gradient(90deg, #1f2937 0%, #6b7280 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Wealth AI
        </span>
      )}
    </div>
  );
};

export default Logo;
