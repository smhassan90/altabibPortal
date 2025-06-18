"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "../DropDowns/UserDropDown";
import { AppContext } from "@/provider/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import { toogleMobile } from "@/redux/sidebar";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { user } = useContext(AppContext);
  const dispatch = useDispatch();
  const isMobileMenuOpen = useSelector((state) => state.sideBar.isMobileMenuOpen);
  return (
    <>
      <nav className="fixed top-0 right-0 z-10 w-full md:w-[calc(100%-14rem)] md:flex-row md:flex-nowrap md:justify-start flex items-center py-3 bg-white">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-6 sm:px-4">
          <div className="flex items-center gap-ratio2">
            <button
              onClick={() => dispatch(toogleMobile())}
              className={`md:hidden z-50 bg-white`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link
              className="text-text text-lg font-semibold"
              href="#pablo"
              // onClick={(e) => e.preventDefault()}
            >
              Hi, {user?.name}
            </Link>
          </div>
          <h2 className="md:hidden text-secondary text-xxLarge font-semibold text-center">
            Al-Tabib
          </h2>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center">
            <UserDropdown user={user} />
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
