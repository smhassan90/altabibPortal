import React from "react";
import StatCard from "../Cards/StatCard";
import { Building2, Heart, ShoppingCart, User2 } from "lucide-react";

const SummaryCard = () => {
  const data = [
    {
      icon: <Building2 className="h-8 w-8 text-[#FF6471]" />,
      title: "TOTAL CLINICS",
      value: "12",
      change: "20",
      bgColor: "bg-[#FF6471]",
    },
    {
      icon: <User2 className="h-8 w-8 text-[#FD784C]" />,
      title: "TOTAL PATIENTS",
      value: "134",
      change: "54",
      bgColor: "bg-[#FD784C]",
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-[#FFD641]" />,
      title: "NEW ORDERS",
      value: "29",
      change: "18",
      bgColor: "bg-[#FFD641]",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#71D099]" />,
      title: "FAVORITES",
      value: "78",
      change: "12",
      bgColor: "bg-[#71D099]",
    },
    {
      icon: <Heart className="h-8 w-8 text-[#2886FF]" />,
      title: "FAVORITES",
      value: "78",
      change: "12",
      bgColor: "bg-[#2886FF]",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-ratio2 my-ratio2">
      {data.map((item,index)=><StatCard data={item}/>)}
    </div>
  );
};

export default SummaryCard;
