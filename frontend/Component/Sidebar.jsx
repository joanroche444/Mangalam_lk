import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Settings, Menu, Moon, Sun } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Toggle Sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const menuItems = [
    { name: "Home", icon: <Home size={24} /> },
    { name: "Profile", icon: <User size={24} /> },
    { name: "Settings", icon: <Settings size={24} /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isOpen ? 200 : 70 }}
        className="h-screen bg-[#EBD4C8] dark:bg-gray-800 text-white shadow-lg flex flex-col p-4"
      >
        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="mb-4 p-2 rounded-md bg-[#EBD4C8] "
        >
          <Menu size={24} />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mb-4 p-2 rounded-md bg-[#EBD4C8] hover:bg-gray-600 flex items-center rounded-full transition-all duration-300 gap-2"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>

        {/* Menu Items */}
        <ul className="flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-full transition-all duration-300"
            >
              {item.icon}
              {isOpen && <span className="text-sm">{item.name}</span>}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Main Content Area */}
      
    </div>
  );
};

export default Sidebar;
