import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useDevice } from "@/contexts/device/DeviceContext";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";

type ResponsiveModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  footerClassName?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const ResponsiveModal = ({
  children,
  isOpen,
  onClose,
  headerContent,
  footerContent,
  footerClassName,
  size = "md",
  className,
}: ResponsiveModalProps) => {
  const sheetRef = useRef<BottomSheetRef | null>(null);
  const { isMobile } = useDevice();

  console.log({ isMobile });
  if (isMobile) {
    return (
      <BottomSheet
        open={isOpen}
        className="z-1000 relative"
        header={headerContent}
        footer={<div className={footerClassName}>{footerContent}</div>}
        ref={sheetRef}
        onDismiss={onClose}
        expandOnContentDrag
      >
        {children}
      </BottomSheet>
    );
  }

  console.log({ isOpen });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          "z- max-w-[90vw]! max-h-[90vh] overflow-auto p-0",
          size === "sm" && "max-w-[400px]!",
          size === "md" && "max-w-[600px]!",
          size === "lg" && "max-w-[800px]!",
          className
        )}
      >
        {headerContent && (
          <DialogHeader className="sticky top-0 bg-background border-b p-4 z-1000">
            {headerContent}
          </DialogHeader>
        )}
        <div className="w-full h-full overflow-auto">{children}</div>
        {footerContent && (
          <DialogFooter
            className={cn(
              "sticky bottom-0 bg-background border-t p-4",
              footerClassName
            )}
          >
            {footerContent}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModal;
