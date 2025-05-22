import React from "react";
import Sidebar from "../SideBar";

const ChildrenBody = ({ children }) => {
  return (
    <>
      <Sidebar/>
      <div className="relative md:ml-56 bg-gray-100 min-h-screen">
        {children}
      </div>
    </>
  );
};

export default ChildrenBody;
