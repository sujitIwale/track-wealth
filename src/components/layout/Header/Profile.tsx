import IconButton from "@/components/common/IconButton/IconButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth/AuthContext";
import { LogOutIcon, UserIcon } from "lucide-react";
import { IoPerson } from "react-icons/io5";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {/* <Avatar> */}
          {/* <AvatarImage src={user?.avatar} /> */}
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <IconButton icon={<IoPerson size={28} />} onClick={() => {}} />
          )}
          {/* <AvatarFallback>
              {user?.name?.charAt(0)}
            </AvatarFallback> */}
          {/* </Avatar> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          <UserIcon className="w-4 h-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          <LogOutIcon className="w-4 h-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
