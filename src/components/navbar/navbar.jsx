import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goDashboard = () => navigate("/dashboard");
  const goTransactions = () => navigate("/transaction");
  const goBudget = () => navigate("/budget");
  const goReports = () => navigate("/report");

  return (
    <div className="w-full navbar border-b shadow-sm sticky top-0 bg-white z-50">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-8 min-w-0">

          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide whitespace-nowrap cursor-pointer">
            <span className="text-blue-500">&lt;</span>
            Fincan.io
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 font-medium">
            <button
              onClick={goDashboard}
              className="hover:text-gray-500 transition"
            >
              Dashboard
            </button>

            <button
              onClick={goTransactions}
              className="hover:text-gray-500 transition"
            >
              Transactions
            </button>

            <button
              onClick={goBudget}
              className="hover:text-gray-500 transition"
            >
              Budgets
            </button>

            <button
              onClick={goReports}
              className="hover:text-gray-500 transition"
            >
              Reports
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {/* Search Bar (Desktop only) */}
          <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none px-2 text-sm"
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4 font-medium navbar">

          <button
            onClick={goDashboard}
            className="text-left hover:text-gray-500"
          >
            Dashboard
          </button>

          <button
            onClick={goTransactions}
            className="text-left hover:text-gray-500"
          >
            Transactions
          </button>

          <button
            onClick={goBudget}
            className="text-left hover:text-gray-500"
          >
            Budgets
          </button>

          <button
            onClick={goReports}
            className="text-left hover:text-gray-500"
          >
            Reports
          </button>

        </div>
      )}
    </div>
  );
};

export default Navbar;