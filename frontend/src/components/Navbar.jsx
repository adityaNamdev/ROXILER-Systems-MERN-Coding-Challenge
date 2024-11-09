import React from "react";
import { TbTransactionRupee } from "react-icons/tb";
import { TfiStatsUp } from "react-icons/tfi";
import { ImStatsBars2 } from "react-icons/im";
import { PiChartPieFill } from "react-icons/pi";
import MonthSelector from "./MonthSelector";
import { NavLink } from "react-router-dom";

const Navbar = ({month ,setMonth}) => {
  return (
    <>
      <header className="md:flex md:items-center md:gap-36 border-b  mx-5 shadow-sm">
        <div className="p-4 md:w-fit">
          <div className="flex justify-center">
            <img
              src="https://roxiler.com/wp-content/uploads/2024/06/Group.svg"
              alt="roxiler-logo"
            />
          </div>
          <h1 className="text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-primary font-bold">
            Dashboard
          </h1>
        </div>

        <nav className="flex  flex-wrap gap-5 justify-center mb-3 md:mb-0">
          <NavLink
            to="/"
            className="flex items-center gap-1 text-gray-800 border p-3 rounded-md hover:bg-primary hover:text-white shadow "
          >
            <TbTransactionRupee size={24} />
            <span className="font-semibold">Transactions</span>
          </NavLink>

          <NavLink
            to="/statistics"
            className="flex items-center gap-1 text-gray-800 border p-3 rounded-md hover:bg-primary hover:text-white shadow "
          >
            <TfiStatsUp size={24} />
            <span className="font-semibold">Statistics</span>
          </NavLink>

          <NavLink
            to="/bar-chart"
            className="flex items-center gap-1 text-gray-800 border rounded-md p-3 hover:bg-primary hover:text-white shadow"
          >
            <ImStatsBars2 size={24} />
            <span className="font-semibold">Bar Chart</span>
          </NavLink>

          <NavLink
            to="/pie-chart"
            className="flex items-center gap-1 text-gray-800 border p-3 rounded-md hover:bg-primary hover:text-white shadow"
          >
            <PiChartPieFill size={24} />
            <span className="font-semibold">Pie Chart</span>
          </NavLink>
        </nav>
      </header>

      <div className="md:absolute right-1 m-4 text-center z-20">
        <MonthSelector  month={month} setMonth={setMonth} />
      </div>
    </>
  );
};

export default Navbar;
