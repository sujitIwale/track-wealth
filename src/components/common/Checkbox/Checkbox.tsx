import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon?: React.ReactNode;
  label?: string;
  labelPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  icon,
  label,
  labelPosition = "right",
  size = "md",
  disabled = false,
  className,
  ariaLabel,
}) => {
  const sizeClasses = {
    sm: "size-3.5",
    md: "size-4.5",
    lg: "size-5.5",
  };

  const iconSizeClasses = {
    sm: "size-2",
    md: "size-3",
    lg: "size-4",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        labelPosition === "left" ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={ariaLabel || label || "checkbox"}
        disabled={disabled}
        className={cn(
          "relative rounded-[4px] border border-gray-300 flex items-center justify-center transition-all duration-200 ease-in-out",
          sizeClasses[size],
          checked
            ? "bg-primary border-primary text-primary-foreground"
            : "bg-white hover:bg-gray-50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && onChange(!checked)}
      >
        {checked && (
          <div className="flex items-center justify-center text-white">
            {icon || <CheckIcon className={iconSizeClasses[size]} />}
          </div>
        )}
      </button>
      {label && (
        <label
          className={cn(
            "text-sm select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
