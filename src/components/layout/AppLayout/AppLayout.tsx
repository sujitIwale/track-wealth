import { Outlet } from "react-router";
import StickyFooter from "../BottomNav/BottomNav";
import Header from "../Header/Header";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate } from "react-router";
import { useDevice } from "@/contexts/device/DeviceContext";

const AppLayout = () => {
  const { user } = useAuth();
  const { isMobile } = useDevice();

  if (user && !user.onboarded) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Centered container with fixed viewport height */}
      <Header />
      {/* Main content scrolls while header/footer remain in view */}
      <main className="pt-16">
        <Outlet />
      </main>
      {isMobile ? <StickyFooter /> : null}
      <Toaster closeButton />
    </div>
  );
};

export default AppLayout;
