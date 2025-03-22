import React from "react";
import { useLocation } from "react-router";
import Profile from "./Profile";

interface NavItem {
  id: string;
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", name: "Dashboard", href: "/dashboard" },
  { id: "transactions", name: "Transactions", href: "/transactions" },
  { id: "budget", name: "Budget", href: "/budget" },
  { id: "settings", name: "Settings", href: "/settings" },
];

const Header: React.FC = () => {
  const location = useLocation();

  // Find the nav item that matches the current path.
  const currentItem = navItems.find(
    (item) => item.href === location.pathname
  ) || { name: "App" };

  return (
    <header className="flex items-center p-4">
      <nav className="flex items-center justify-between w-full">
        <img
          src="/public/assets/logos/expenses.png"
          alt="Logo"
          className="w-8 h-8"
        />
        {/* Display current route name next to the logo */}
        <span className="ml-3 text-lg font-semibold">{currentItem.name}</span>
        <Profile />
      </nav>
    </header>
  );
};

export default Header;
