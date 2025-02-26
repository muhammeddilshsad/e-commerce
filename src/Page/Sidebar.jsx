import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, Box, BarChart, LogOut, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-2 bg-gray-900 text-white rounded-full shadow-md z-50"
      >
        <Menu size={24} />
      </button>

  
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-500 ${
          isOpen ? "w-64" : "w-16"
        } overflow-hidden shadow-lg z-50`}
      >
        <div className="flex items-center justify-center mt-10">
          <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>Admin Dashboard</h1>
        </div>

        <div className="mt-6">
          <SidebarItem icon={<LayoutDashboard />} text="Overview" to="/overview" isOpen={isOpen} />
          <SidebarItem icon={<User />} text="Users" to="/viewuser" isOpen={isOpen} />
          <SidebarItem icon={<Box />} text="Products" to="/viewproduct" isOpen={isOpen} />
          <SidebarItem icon={<BarChart />} text="Revenue" to="/viewrevenew" isOpen={isOpen} />
          <SidebarItem icon={<LogOut />} text="Logout" to="/signin" isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};


const SidebarItem = ({ icon, text, to, isOpen }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center w-full px-6 py-3 hover:bg-gray-700 transition-all duration-300"
    >
      <span className="mr-4">{icon}</span>
      <span className={`${!isOpen && "hidden"}`}>{text}</span>
    </button>
  );
};

export default Sidebar;
