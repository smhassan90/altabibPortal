"use client"
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "../DropDowns/UserDropDown";
import { AppContext } from "@/provider/AppProvider";

function Navbar() {
  const {user} = useContext(AppContext)
  return (
    <>
      <nav className="fixed top-0 right-0 z-10 w-[calc(100%-14rem)] md:flex-row md:flex-nowrap md:justify-start flex items-center py-3 bg-white">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-6 px-4">
          <Link
            className="text-text text-lg hidden lg:inline-block font-semibold"
            href="#pablo"
            // onClick={(e) => e.preventDefault()}
          >
            Hi, {user?.name}
          </Link>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown user={user}/>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;