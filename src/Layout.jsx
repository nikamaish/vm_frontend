// Layout.js
import React from "react";
import Navbar from "./componentshome/navbar/Navbar";
import Footer from "./componentshome/Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      {children}

    </div>
  );
};

export default Layout;
