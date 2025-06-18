import React from "react";
import Sidebar from "../SideBar";
import Navbar from "../Navbar";

const ChildrenBody = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-56 bg-gray-100 min-h-screen">
        <Navbar/>
        <div className="md:pt-16 px-ratio2 md:px-ratio1">
          {children}
        </div>
      </div>
    </>
  );
};

export default ChildrenBody;
