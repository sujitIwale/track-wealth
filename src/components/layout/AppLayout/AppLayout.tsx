import { Outlet } from "react-router";
import StickyFooter from "../BottomNav/BottomNav";
import Header from "../Header/Header";
import AddExpense from "../../AddExpense/AddExpense";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/contexts/auth/AuthContext";
import { Navigate } from "react-router";

const AppLayout = () => {
  const { user } = useAuth();

  if (user && !user.onboarded) {
    return <Navigate to="/onboarding" />;
  }

  return (
    <div className="flex justify-center min-h-screen">
      {/* Centered container with fixed viewport height */}
      <div className="w-full max-w-md h-screen flex flex-col">
        <Header />
        {/* Main content scrolls while header/footer remain in view */}
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
        <StickyFooter />
      </div>

      <AddExpense />
      <Toaster closeButton />
    </div>
  );
};

export default AppLayout;
