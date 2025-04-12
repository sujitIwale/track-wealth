import React, { JSX } from "react";
import { cn } from "@/lib/utils";

export type Color =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "inherit";
export type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "button";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Specifies the style variant */
  variant?: Variant;
  /** Optionally override the element type */
  component?: React.ElementType;
  /** Text color variant */
  color?: Color;
  /** Whether the text should be displayed as a block */
  display?: "initial" | "block" | "inline";
  /** Apply gutterBottom margin */
  gutterBottom?: boolean;
  /** Whether text should wrap or truncate */
  noWrap?: boolean;
  /** Alignment of text */
  align?: "inherit" | "left" | "center" | "right" | "justify";
  children: React.ReactNode;
  /** Additional custom classes */
  className?: string;
}

const defaultElement: Record<Variant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
  button: "span",
};

const variantMapping: Record<Variant, string> = {
  h1: "text-6xl font-light leading-tight",
  h2: "text-5xl font-light leading-tight",
  h3: "text-4xl font-normal leading-snug",
  h4: "text-3xl font-normal leading-snug",
  h5: "text-2xl font-medium leading-normal",
  h6: "text-xl font-semibold leading-normal",
  subtitle1: "text-base font-normal leading-relaxed",
  subtitle2: "text-sm font-medium leading-relaxed",
  body1: "text-base font-normal leading-relaxed",
  body2: "text-sm font-normal leading-relaxed",
  caption: "text-xs font-normal leading-loose",
  overline: "text-xs font-medium leading-loose uppercase tracking-wider",
  button: "text-sm font-medium leading-normal uppercase",
};

const colorMapping: Record<Color, string> = {
  primary: "text-blue-600",
  secondary: "text-gray-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-400",
  success: "text-green-600",
  inherit: "",
};

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = "body1",
      component,
      color = "inherit",
      display = "initial",
      gutterBottom = false,
      noWrap = false,
      align = "inherit",
      children,
      className = "",
      ...rest
    },
    ref
  ) => {
    const Component = component || defaultElement[variant];

    const classes = cn(
      variantMapping[variant],
      colorMapping[color],
      display === "block" ? "block" : display === "inline" ? "inline" : "",
      gutterBottom ? "mb-4" : "",
      noWrap ? "whitespace-nowrap overflow-hidden text-ellipsis" : "",
      align !== "inherit" ? `text-${align}` : "",
      className
    );

    return (
      <Component ref={ref} className={classes} {...rest}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
