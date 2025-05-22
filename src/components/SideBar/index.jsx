"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  PieChart,
  CalendarHeart,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FadeInSection } from "../Animation";

export default function Sidebar() {
  const pathName = usePathname();
  const path = pathName.split("/")[2];
  const [activeTab, setActiveTab] = useState(FormatToUpperCase(path) || "Dashboard");
  const router = useRouter();
  function FormatToUpperCase(label){
    return label?.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
  useEffect(() => {
    setActiveTab(FormatToUpperCase(path) || "Dashboard");
  }, [path]);
  const menus = [
    {
      link: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      link: "/dashboard/entities",
      icon: <CalendarHeart size={20} />,
      label: "Entities",
    },
    {
      link: "/dashboard/settings",
      icon: <Settings size={20} />,
      label: "Settings",
    },
    {
      link: "/dashboard/summary",
      icon: <PieChart size={20} />,
      label: "Summary",
    },
  ];

  const handleMenu = (menu) => {
    router.push(menu.link);
  };
  return (
    <>
      <FadeInSection delay={0.2}>
        <nav className="md:fixed md:top-0 md:bottom-0  items-center justify-between relative md:w-56 z-10 py-2 rounded-2xl px-4">
          <h2 className="text-secondary text-xLarge font-semibold text-center border-b border-border pb-2">
            Al-Tabib
          </h2>
          <div className="mt-5 space-y-3">
            {menus.map((menu,index) => (
              <div key={index}
                className={`flex items-center gap-4 px-4 py-3 rounded-medium cursor-pointer ${
                  activeTab == menu.label
                    ? "text-secondary bg-[#0066a11a]"
                    : "text-primary"
                }`}
                onClick={() => handleMenu(menu)}
              >
                <span>{menu.icon}</span>
                <p className="font-normal">{menu.label}</p>
              </div>
            ))}
          </div>
        </nav>
      </FadeInSection>
    </>
  );
}
