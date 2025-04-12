import Typography from "../common/Typography/Typography";

interface EmptyStateProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
}

const EmptyState = ({
  title,
  description,
  actions,
  size = "medium",
  className,
}: EmptyStateProps) => {
  return (
    <div
      className={`flex grow flex-col items-center justify-center h-full ${className}`}
    >
      <svg
        width={size === "small" ? "80" : size === "medium" ? "120" : "160"}
        height={size === "small" ? "60" : size === "medium" ? "90" : "120"}
        viewBox="0 0 120 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="45" r="25" fill="#E2E8F0" />
        <path
          d="M45 45 h30 M60 30 v30"
          stroke="#94A3B8"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M30 65 C40 55, 50 75, 60 65 C70 55, 80 65, 90 55"
          stroke="#60A5FA"
          strokeWidth="2"
          strokeDasharray="2 2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="30" cy="20" r="5" fill="#FDE68A" />
        <circle cx="90" cy="25" r="3" fill="#FBBF24" />
        <circle cx="85" cy="70" r="4" fill="#BAE6FD" />
      </svg>
      <Typography
        variant={
          size === "small"
            ? "subtitle2"
            : size === "medium"
            ? "subtitle1"
            : "h5"
        }
        className="text-gray-700 font-medium text-center"
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          variant={
            size === "small"
              ? "caption"
              : size === "medium"
              ? "subtitle2"
              : "subtitle1"
          }
          className="text-gray-500 font-normal text-center"
        >
          {description}
        </Typography>
      ) : null}
      {actions ? actions : null}
    </div>
  );
};

export default EmptyState;
