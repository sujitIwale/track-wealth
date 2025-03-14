import React from "react";
import ReactDOM from "react-dom";
import { FiX } from "react-icons/fi";
import IconButton from "../IconButton/IconButton";
import Typography from "../Typography/Typography";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "full";
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

interface ModalHeaderProps {
  children?: React.ReactNode;
  title?: string;
  onClose: () => void;
  className?: string;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
} = ({
  isOpen,
  onClose,
  size = "md",
  children,
  showCloseButton = true,
  className = "",
}) => {
  if (!isOpen) return null;

  // Define Tailwind size mappings for larger screens.
  const sizeMapping: { [key in "sm" | "md" | "lg" | "full"]: string } = {
    sm: "md:max-w-sm",
    md: "md:max-w-md",
    lg: "md:max-w-lg",
    full: "w-full h-full",
  };

  const containerClasses =
    size === "full"
      ? "w-full h-full"
      : `w-full md:w-11/12 ${sizeMapping[size]}`;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col md:flex md:items-center md:justify-center bg-gray-800 bg-opacity-40"
      onClick={onClose} // Click outside to close
    >
      <div
        className={`${containerClasses} mt-auto md:mt-0 bg-white relative rounded-t-lg md:rounded-lg transition-transform duration-300 transform ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        {showCloseButton ? (
          <IconButton
            icon={<FiX size={24} />}
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          />
        ) : null}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  onClose,
  title,
  className = "",
}) => (
  <div className={`flex items-center justify-between p-4 ${className}`}>
    {title && <Typography variant="h5">{title}</Typography>}
    {children && <div>{children}</div>}
    <IconButton
      className="p-0"
      icon={<IoClose size={24} />}
      onClick={onClose}
    />
  </div>
);

const ModalBody: React.FC<ModalBodyProps> = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = "",
}) => (
  <div className={`flex items-center justify-end ${className}`}>{children}</div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
