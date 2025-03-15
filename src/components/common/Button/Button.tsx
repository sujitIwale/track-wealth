import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  loader?: React.ReactNode;
}

// Color and variant classes
const variantClasses = {
  contained: {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary:
      "bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-300",
    error: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
    warning:
      "bg-yellow-600 text-white hover:bg-yellow-700 disabled:bg-yellow-300",
    info: "bg-cyan-600 text-white hover:bg-cyan-700 disabled:bg-cyan-300",
    success: "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300",
  },
  outlined: {
    primary:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300",
    secondary:
      "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 disabled:border-purple-300 disabled:text-purple-300",
    error:
      "border-2 border-red-600 text-red-600 hover:bg-red-50 disabled:border-red-300 disabled:text-red-300",
    warning:
      "border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-50 disabled:border-yellow-300 disabled:text-yellow-300",
    info: "border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 disabled:border-cyan-300 disabled:text-cyan-300",
    success:
      "border-2 border-green-600 text-green-600 hover:bg-green-50 disabled:border-green-300 disabled:text-green-300",
  },
  text: {
    primary: "text-blue-600 hover:bg-blue-50 disabled:text-blue-300",
    secondary: "text-purple-600 hover:bg-purple-50 disabled:text-purple-300",
    error: "text-red-600 hover:bg-red-50 disabled:text-red-300",
    warning: "text-yellow-600 hover:bg-yellow-50 disabled:text-yellow-300",
    info: "text-cyan-600 hover:bg-cyan-50 disabled:text-cyan-300",
    success: "text-green-600 hover:bg-green-50 disabled:text-green-300",
  },
};

// Size classes
const sizeClasses = {
  small: "px-3 py-1 text-sm",
  medium: "px-4 py-2",
  large: "px-6 py-3 text-lg",
};

const DefaultSpinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "primary",
  size = "medium",
  fullWidth = false,
  startIcon,
  endIcon,
  className = "",
  children,
  disabled,
  loading = false,
  loader,
  ...props
}) => {
  // Base classes
  const baseClasses =
    "rounded font-medium transition-all duration-200 flex items-center justify-center";

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant][color],
    fullWidth ? "w-full" : "",
    disabled || loading ? "cursor-not-allowed" : "cursor-pointer",
    className,
  ].join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <span className="flex items-center justify-center">
          {loader || <DefaultSpinner />}
        </span>
      ) : (
        <>
          {startIcon && <span className="mr-2">{startIcon}</span>}
          {children}
          {endIcon && <span className="ml-2">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
