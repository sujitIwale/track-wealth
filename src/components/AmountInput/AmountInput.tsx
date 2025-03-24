import React, {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from "react";
import { currenciesMap } from "@/constants/misc";

interface AmountInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string | number;
  onChange?: (value: number) => void;
  currency?: string;
  autoFocus?: boolean;
}

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    { value, onChange, currency = "USD", autoFocus = true, className = "" },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const currencySymbol = currency ? currenciesMap[currency].symbol : "$";

    // Set the initial formatted value
    useEffect(() => {
      if (value !== undefined) {
        try {
          const numValue =
            typeof value === "string" ? parseInt(value, 10) : value;
          if (!isNaN(numValue)) {
            const formattedValue = numValue.toLocaleString("en-US");
            setInputValue(formattedValue);
            setError(false);
          }
        } catch {
          setError(true);
          setInputValue("");
        }
      }
    }, [value]);

    // Auto focus on mount if needed
    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    // Prevent unwanted keys
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Allow control keys (backspace, delete, arrows, tab)
      if (
        e.key === "Backspace" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Delete" ||
        e.key === "Tab"
      ) {
        return;
      }

      // Handle Enter key
      if (e.key === "Enter") {
        e.preventDefault();
        inputRef.current?.blur();
        return;
      }

      // Handle Space key
      if (e.key === " ") {
        e.preventDefault();
        return;
      }

      // If key is a single character and is not a digit, prevent it
      if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    };

    // Handle input changes and formatting
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      let rawValue = e.target.value;

      // Remove all non-numeric characters
      rawValue = rawValue.replace(/[^\d]/g, "");

      // Remove leading zeros
      if (rawValue.length > 1) {
        rawValue = rawValue.replace(/^0+/, "");
      }

      // Convert to a number for validation
      const numericValue = rawValue ? parseInt(rawValue, 10) : 0;

      if (!rawValue || isNaN(numericValue)) {
        setError(true);
        setInputValue(rawValue);
        onChange?.(0);
        return;
      }

      setError(false);

      try {
        // Format the value with commas
        const formattedValue = numericValue.toLocaleString("en-US");
        setInputValue(formattedValue);
        onChange?.(numericValue);
      } catch {
        setError(true);
        setInputValue(rawValue);
        onChange?.(0);
      }
    };

    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="inline-flex items-center bg-transparent rounded-lg px-4 py-2 min-w-[120px]">
          <span className="text-3xl font-medium text-black mr-2">
            {currencySymbol}
          </span>
          <input
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="0"
            className={`inline-block text-6xl md:text-5xl font-medium focus:outline-none bg-transparent border-none p-0 w-auto text-center ${
              error ? "text-red-500" : "text-black"
            }`}
            style={{
              width: `${(inputValue.length || 1) * 1.1}ch`,
              minWidth: "2ch",
            }}
          />
        </div>
      </div>
    );
  }
);

AmountInput.displayName = "AmountInput";

export default AmountInput;
