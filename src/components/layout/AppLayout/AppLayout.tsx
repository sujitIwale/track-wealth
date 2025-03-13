import { Outlet } from "react-router";
import StickyFooter from "../BottomNav/BottomNav";
import Header from "../Header/Header";

const AppLayout = () => {
  return (
    <div className="flex justify-center min-h-screen bg-gray-200">
      {/* Centered container with fixed viewport height */}
      <div className="w-full max-w-md h-screen flex flex-col bg-gradient-to-t from-blue-100 to-transparent">
        <Header />
        {/* Main content scrolls while header/footer remain in view */}
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
        <StickyFooter />
      </div>
    </div>
  );
};

export default AppLayout;
