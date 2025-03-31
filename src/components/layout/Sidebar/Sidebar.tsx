import { desktopNavItems } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { House } from "lucide-react";
import { List } from "lucide-react";
import { IoMdAdd } from "react-icons/io";
import { IoIosWallet } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router";

const iconsMap = {
  house: <House size={28} />,
  list: <List size={28} />,
  plus: <IoMdAdd size={28} />,
  wallet: <IoIosWallet size={28} />,
  settings: <IoIosSettings size={28} />,
};

const Sidebar = () => {
  // Find the nav item that matches the current path.
  const currentItem = desktopNavItems.find(
    (item) => item.href === location.pathname
  ) || { name: "App" };

  return (
    <div className="flex flex-col justify-between px-8 py-8 w-[200px] sm:bg-gray-50 sm:rounded-r-lg">
      <nav className="flex flex-col gap-8 w-full">
        {desktopNavItems.map((item, index) => {
          return (
            <Link
              to={item.href!}
              key={index}
              className={cn(
                "flex items-center gap-2",
                currentItem.name === item.name
                  ? "text-gray-900"
                  : "text-gray-500"
              )}
            >
              {iconsMap[item.icon as keyof typeof iconsMap]}
              <span className="text-sm font-bold">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
