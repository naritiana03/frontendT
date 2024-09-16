import { LogOut } from "lucide-react";
import { Settings } from "lucide-react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/store/authStore";

export function UserConnected() {
  const { user, logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="font-MachinaBold">
            {user?.lname}{" "}
            <span className="font-MachinaRegular">({user?.type})</span>
          </span>
          <ChevronDown size={24} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="size-4 mr-2" />
            <span>Paramètre</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={logout}>
            <LogOut className="size-4 mr-2" />
            <span>Se déconnecter</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
