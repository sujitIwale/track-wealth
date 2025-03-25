import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import Profile from "./Profile";
import { useDevice } from "@/contexts/device/DeviceContext";
import { List, Wallet } from "lucide-react";
import { House } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    id: "dashboard",
    href: "/dashboard",
    icon: <House size={24} />,
  },
  {
    name: "Transactions",
    id: "transactions",
    href: "/expenses",
    icon: <List size={24} />,
  },
  {
    name: "Budget",
    id: "budget",
    href: "/budget",
    icon: <Wallet size={24} />,
  },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { isMobile } = useDevice();

  // Find the nav item that matches the current path.
  const currentItem = navItems.find(
    (item) => item.href === location.pathname
  ) || { name: "App" };

  return (
    <header className="flex items-center justify-between p-4 sm:pt-8 sticky top-0 left-0 right-0 bg-white z-[1000]">
      <img
        src="/public/assets/logos/expenses.png"
        alt="Logo"
        className="w-8 h-8"
      />
      {isMobile ? (
        <span className="ml-3 text-lg font-semibold">{currentItem.name}</span>
      ) : (
        <nav className="flex items-center justify-between w-full max-w-md mx-auto">
          {navItems.map((item, index) => {
            return (
              <Link
                to={item.href}
                key={index}
                className={cn(
                  "flex items-end gap-2",
                  currentItem.name === item.name && "text-amber-600"
                )}
              >
                {item.icon}
                <span className="text-sm font-bold">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      )}
      <Profile />
    </header>
  );
};

export default Header;
