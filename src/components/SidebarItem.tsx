import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement;
}) {
    const navigate = useNavigate();
    const handleClick = () => {
        const path = `/dashboard/${text.toLowerCase()}`;
        navigate(path);
    };
    return <div onClick={handleClick} className="flex items-center text-gray-700 p-5 cursor-pointer hover:bg-gray-200 rounded max-w-48  transition-all duration-150">
        <div className="pr-4">
            {icon}
        </div>
        <div className="text-xl font-medium">
         {text}
        </div>
    </div>
}
