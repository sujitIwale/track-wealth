import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
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
    <aside className="flex flex-col justify-between px-8 py-4 w-[200px] border-r border-gray-200">
      <div className="flex flex-col w-full">
        <Logo />
        <nav className="flex flex-col gap-8 w-full mt-5">
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
      <div className="flex flex-col gap-2">
        <Link to="/transaction/expense">
          <Button variant="default">
            <IoMdAdd size={28} />
            <span className="text-sm font-bold">Add Transaction</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
