import { ReactNode, FC } from "react";

interface StateRendererProps {
  /** If true, renders the "failure" UI */
  isFailure?: boolean;
  /** If true, renders the "loading" UI */
  isLoading?: boolean;
  /** If true, renders the "success" UI */
  isSuccess?: boolean;

  /** A wrapper around the selected state's UI */
  LayoutWrapper: FC<{ children: ReactNode }>;

  /**
   * Function returning the UI for "idle" state
   * (Used when none of isFailure, isLoading, isSuccess is true)
   */
  default: () => ReactNode;

  /** Function returning the UI for "loading" state */
  loading?: () => ReactNode;

  /** Function returning the UI for "success" state */
  success?: () => ReactNode;

  /** Function returning the UI for "failure" state */
  failure?: () => ReactNode;
}

/**
 * Renders exactly one of: idle, loading, success, failure.
 * Whichever function is active will be called. The others won't run at all.
 */
const StateRenderer: FC<StateRendererProps> = ({
  isFailure,
  isLoading,
  isSuccess,
  LayoutWrapper,
  default: renderDefault,
  loading,
  success,
  failure,
}) => {
  let content: ReactNode = null;

  if (isFailure && failure) {
    // Render only the "failure" UI
    content = failure();
  } else if (isLoading && loading) {
    // Render only the "loading" UI
    content = loading();
  } else if (isSuccess && success) {
    // Render only the "success" UI
    content = success();
  } else {
    // Default fallback is "idle"
    content = renderDefault();
  }

  return <LayoutWrapper>{content}</LayoutWrapper>;
};

export default StateRenderer;
