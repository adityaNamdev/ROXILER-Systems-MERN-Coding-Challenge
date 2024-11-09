import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const MainLayout = ({month,setMonth}) => {
  return (
    <>
      <Navbar month={month} setMonth={setMonth}/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default MainLayout;
