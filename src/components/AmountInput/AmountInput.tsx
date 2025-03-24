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

const AmountInput = forwardRef<HTMLSpanElement, AmountInputProps>(
  (
    { value, onChange, currency = "USD", autoFocus = true, className = "" },
    ref
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const spanRef = useRef<HTMLSpanElement>(null);

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

    // Set caret to end whenever inputValue changes
    useEffect(() => {
      if (spanRef.current) {
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(spanRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }, [inputValue]);

    // Auto focus on mount if needed
    useEffect(() => {
      if (autoFocus && spanRef.current) {
        spanRef.current.focus();
      }
    }, [autoFocus]);

    // Prevent unwanted keys before they’re added
    const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
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
      // If key is a single character and is not a digit, prevent it
      if (e.key.length === 1 && !/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    };

    // Handle input changes and formatting
    const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
      let rawValue = e.currentTarget.textContent || "";

      // Remove all non-numeric characters
      rawValue = rawValue.replace(/[^\d]/g, "");

      // Remove leading zeros
      if (rawValue.length > 1) {
        rawValue = rawValue.replace(/^0+/, "");
      }

      // Convert to a number for validation
      const numericValue = parseInt(rawValue, 10);

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
          <span
            ref={(node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              spanRef.current = node;
            }}
            role="textbox"
            contentEditable={true}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            suppressContentEditableWarning={true}
            className={`inline-block text-6xl md:text-5xl font-medium focus:outline-none ${
              error ? "text-red-500" : "text-black"
            }`}
            data-placeholder="0"
          >
            {inputValue}
          </span>
        </div>
      </div>
    );
  }
);

AmountInput.displayName = "AmountInput";

export default AmountInput;
