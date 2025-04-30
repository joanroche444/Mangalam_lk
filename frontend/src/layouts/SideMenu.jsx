import React from "react";
import { SIDE_MENU_DATA } from "../utils/data";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
    const navigate = useNavigate();

    const handleClick = (path) => {
        navigate(path);
    };

    return (
        <div className="w-64 bg-gray-100 p-4 min-h-screen">
            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 
                        ${activeMenu === item.label ? "text-white bg-primary" : "text-black bg-gray-200"}
                    `}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;
