"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  PieChart,
  CalendarHeart,
  Hospital,
  HeartPulse,
  Stethoscope,
  GraduationCap,
  FileChartLine,
  Layers2,
  Menu,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FadeInSection } from "../Animation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/auth";
import { openSideBar, toogleMobile } from "@/redux/sidebar";
import { debounce } from "lodash";

export default function Sidebar() {
  const pathName = usePathname();
  const path = pathName.split("/")[2];
  const user = useSelector((state) => state.auth.user);
  const sidebarOpen = useSelector((state) => state.sideBar.sidebar);
  const isMobileMenuOpen = useSelector(
    (state) => state.sideBar.isMobileMenuOpen
  );
  const showHide = sidebarOpen || isMobileMenuOpen ? "block" : "hidden";
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(
    FormatToUpperCase(path) || "Dashboard"
  );
  const router = useRouter();
  function FormatToUpperCase(label) {
    return label
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
    setActiveTab(FormatToUpperCase(path) || "Dashboard");
  }, [path]);

  const handleResize = useCallback(
    debounce(() => {
      if (window.innerWidth > 1024) {
        dispatch(toogleMobile(false));
        dispatch(openSideBar(true));
      } else {
        dispatch(openSideBar(false));
      }
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [handleResize]);

  const menus = [
    {
      link: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      show: [5, 4, 3],
    },
    {
      link: "/dashboard/summary",
      icon: <PieChart size={20} />,
      label: "Summary",
      show: [3],
    },
    {
      link: "/dashboard/doctors",
      icon: <Stethoscope size={20} />,
      label: "Doctors",
      show: [5, 4],
    },
    {
      link: "/dashboard/clinics",
      icon: <Hospital size={20} />,
      label: "Clinics",
      show: [5],
    },
    {
      link: "/dashboard/patients",
      icon: <HeartPulse size={20} />,
      label: "Patients",
      show: [5, 4],
    },
    {
      link: "/dashboard/appointments",
      icon: <FileChartLine size={20} />,
      label: "Appointments",
      show: [5, 4],
    },
    {
      link: "/dashboard/qualification",
      icon: <GraduationCap size={20} />,
      label: "Qualification",
      show: [5],
    },
    {
      link: "/dashboard/specialization",
      icon: <Layers2 size={20} />,
      label: "Specialization",
      show: [5],
    },
    {
      link: "/dashboard/settings",
      icon: <Settings size={20} />,
      label: "Settings",
      show: [5, 4, 3],
    },
    {
      link: "/auth/login",
      icon: <PieChart size={20} />,
      label: "Logout",
      show: [5, 4, 3],
    },
  ];

  const handleMenu = (menu) => {
    if (menu.label === "Logout") {
      router.push("/auth/login");
      setTimeout(() => {
        dispatch(logout());
      }, [5000]);
      return;
    }
    router.push(menu.link);
    if (window.innerWidth < 1024) {
      dispatch(toogleMobile(false));
    }
  };
  return (
    <>
      {/* {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => dispatch(toogleMobile(false))}
        />
      )} */}
      <FadeInSection delay={0.2}>
        <nav
          className={`w-full fixed top-0 bottom-0 z-10 shadow-md items-center justify-between md:w-56 py-2 rounded-2xl transition-transform duration-300 !bg-white ${isMobileMenuOpen ? 'translate-x-0 top-10' : '-translate-x-full'} md:translate-x-0
            `}
        >
          <h2 className="hidden md:block text-secondary text-xxLarge font-semibold text-center border-b border-border pb-4 px-4">
            Al-Tabib
          </h2>
          <div className="mt-5 space-y-2 px-4 overflow-y-auto max-h-[calc(100vh-13vh)]">
            {menus.map((menu, index) => {
              if (menu.show.includes(parseInt(user?.type))) {
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 px-4 py-3 rounded-medium cursor-pointer ${
                      activeTab == menu.label
                        ? "text-secondary bg-[#0066a11a]"
                        : "text-primary"
                    }`}
                    onClick={() => handleMenu(menu)}
                  >
                    <span>{menu.icon}</span>
                    <p className="font-normal text-small 2xl:text-medium">
                      {menu.label}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </nav>
      </FadeInSection>
    </>
  );
}
