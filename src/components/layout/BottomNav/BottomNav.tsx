import React from "react";
import { FaHome, FaExchangeAlt, FaWallet, FaCog } from "react-icons/fa";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactElement;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: <FaHome size={24} /> },
  {
    name: "Transactions",
    href: "/transactions",
    icon: <FaExchangeAlt size={24} />,
  },
  { name: "Budget", href: "/budget", icon: <FaWallet size={24} /> },
  { name: "Settings", href: "/settings", icon: <FaCog size={24} /> },
];

const StickyFooter: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner">
      <nav className="max-w-md mx-auto px-4 py-3 flex justify-between">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors"
          >
            {item.icon}
            <span className="text-xs mt-1">{item.name}</span>
          </a>
        ))}
      </nav>
    </footer>
  );
};

export default StickyFooter;
