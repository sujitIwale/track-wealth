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
      <DialogContent className="z-1000 ">
        {headerContent && <DialogHeader>{headerContent}</DialogHeader>}
        {children}
        {footerContent && <DialogFooter>{footerContent}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModal;
