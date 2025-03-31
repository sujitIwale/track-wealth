import { Outlet } from "react-router";
import StickyFooter from "../BottomNav/BottomNav";
import Header from "../Header/Header";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate } from "react-router";
import { useDevice } from "@/contexts/device/DeviceContext";
import Sidebar from "../Sidebar/Sidebar";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const { user } = useAuth();
  const { isMobile, isDesktop } = useDevice();

  if (user && !user.onboarded) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Centered container with fixed viewport height */}
      <Header />
      {/* Main content scrolls while header/footer remain in view */}
      <div
        className={cn(
          "h-full mb-[68px] sm:mb-0",
          isDesktop ? "flex gap-4" : ""
        )}
      >
        {isMobile ? null : <Sidebar />}
        <main className="grow sm:pb-16 sm:px-8 sm:h-full sm:overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {isMobile ? <StickyFooter /> : null}
      <Toaster closeButton />
    </div>
  );
};

export default AppLayout;
