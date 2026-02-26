import React from "react";
import logo from "../../assets/images/logo.png"
import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();
  const transactions = () => {
    navigate("/transaction")
  }
const Dashboard = ()=>{
  navigate("/dashboard")
}
const Budget = () =>{
  navigate("/Budget")
}
const Reports =() =>{
  navigate("/report")
}
  return (
    <>
      <div className="w-full navbar border-b-2 border-b-amber-50 px-8 py-4 flex items-center justify-between shadow-md">

        {/* Left Side */}
        <div className="flex items-center gap-10">

          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">
            <span className="text-blue-500">&lt;</span>
            Fincan.io
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8  font-medium">
            <button className="hover:text-gray-500 transition duration-200" onClick={Dashboard}>
              Dashboard
            </button>
            <button className="hover:text-gray-500 transition duration-200" onClick={transactions}>
              Transactions
            </button>
            <button className="hover:text-gray-500 transition duration-200" onClick={Budget}>
              Budgets
            </button>
            <button className="hover:text-gray-500 transition duration-200" onClick={Reports}> 
              Reports
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Search Bar */}
          <div className="hidden md:flex items-center backGround px-3 py-2 rounded-lg">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search anything here..."
              className="bg-transparent outline-none px-2 text-sm placeholder-gray-400"
            />
          </div>



          {/* Profile Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-400 overflow-hidden cursor-pointer">
            <img
              src={logo}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;
