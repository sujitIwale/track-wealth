import { Outlet } from "react-router";
import StickyFooter from "../BottomNav/BottomNav";
import Header from "../Header/Header";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate } from "react-router";
import { useDevice } from "@/contexts/device/DeviceContext";
import Sidebar from "../Sidebar/Sidebar";
import Import from "@/components/Import/Import";

const AppLayout = () => {
  const { user } = useAuth();
  const { isMobile, isDesktop } = useDevice();

  if (user && !user.onboarded) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      {/* Centered container with fixed viewport height */}
      {isDesktop ? <Sidebar /> : null}
      {/* Main content scrolls while header/footer remain in view */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto sm:pb-16 sm:px-8">
          <Outlet />
        </main>
      </div>
      {isMobile ? <StickyFooter /> : null}
      <Toaster closeButton />
      <Import />
    </div>
  );
};

export default AppLayout;
