import React from "react";
import { NavLink, useNavigate } from "react-router";
import IconButton from "../../common/IconButton/IconButton";
import {
  IoIosSettings,
  IoIosSwap,
  IoIosWallet,
  IoMdAdd,
  IoMdHome,
} from "react-icons/io";

interface NavItem {
  id: string;
  name: string;
  href?: string;
  icon: React.ReactElement;
  type: "button" | "link";
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    id: "dashboard",
    href: "/dashboard",
    icon: <IoMdHome size={28} />,
    type: "link",
  },
  {
    name: "Transactions",
    id: "transactions",
    href: "/expenses",
    icon: <IoIosSwap size={28} />,
    type: "link",
  },
  {
    name: "Add Expense",
    id: "add-expense",
    icon: <IoMdAdd size={28} />,
    type: "button",
  },
  {
    name: "Budget",
    id: "budget",
    href: "/budget",
    icon: <IoIosWallet size={28} />,
    type: "link",
  },
  {
    name: "Settings",
    id: "settings",
    href: "/settings",
    icon: <IoIosSettings size={28} />,
    type: "link",
  },
];

const StickyFooter: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white shadow-accent">
      <nav className="max-w-md mx-auto px-5 py-4 flex justify-between items-center">
        {navItems.map((item, index) => {
          if (item.type === "link") {
            return (
              <NavLink
                key={index}
                to={item.href!}
                // Apply a dark color if active, light otherwise
                className={({ isActive }) =>
                  isActive ? "text-gray-900" : "text-gray-400"
                }
              >
                {item.icon}
              </NavLink>
            );
          }
          return (
            <IconButton
              key={index}
              className="p-3 bg-amber-600 text-white"
              icon={item.icon}
              onClick={() => {
                navigate("/expense");
              }}
            />
          );
        })}
      </nav>
    </footer>
  );
};

export default StickyFooter;
