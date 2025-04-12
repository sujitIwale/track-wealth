import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { useDevice } from "@/contexts/device/DeviceContext";
import { useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";

type ResponsiveModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
};

const ResponsiveModal = ({
  children,
  isOpen,
  onClose,
  headerContent,
  footerContent,
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
        footer={footerContent}
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
      <DialogContent className="z-1000 w-full max-w-[90vw]! max-h-[90vh] overflow-auto p-0">
        {headerContent && (
          <DialogHeader className="sticky top-0 bg-background border-b p-4 z-1000">
            {headerContent}
          </DialogHeader>
        )}
        <div className="w-full h-full overflow-auto p-4">{children}</div>
        {footerContent && (
          <DialogFooter className="sticky bottom-0 bg-background border-t p-4">
            {footerContent}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModal;
