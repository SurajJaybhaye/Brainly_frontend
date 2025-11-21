import { useNavigate } from "react-router-dom";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";

export function Sidebar() {
  const navigate = useNavigate();
  const handleClick = () => {
    const path = `/dashboard`;
    navigate(path);
  };
  return (
    <div className="h-screen bg-white w-72 fixed left-0 top-0 pl-6">
      <div
        onClick={handleClick}
        className="flex text-2xl pt-8 items-center cursor-pointer"
      >
        <div className="pr-2 text-purple-400">
          <Logo />
        </div>
        <div className="font-sans text-3xl font-bold">BRAINLY</div>
      </div>
      <div className="pt-8 w-full pl-8">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        <div className="fixed bottom-10 left-20">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
