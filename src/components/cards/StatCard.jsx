"use client";
import Image from "next/image";
import React from "react";

const StatCard = ({ data }) => {
  const { icon, title, value, change, bgColor } = data;
  return (
    <div className={`rounded-medium p-ratio2 text-white flex items-center ${bgColor}`}>
      <div className="bg-white/20 p-2 rounded-medium mr-4">
        <div className="bg-white rounded-medium w-14 h-14 flex items-center justify-center">
          <Image
            src={icon}
            height={28}
            width={28}
            alt="Icon"
            className="w-7 h-7"
          />
        </div>
      </div>
      <div>
        <h3 className="text-white/90 font-medium uppercase text-xSmall tracking-wide">
          {title}
        </h3>
        <p className="text-xLarge">
          <span className="">{value}</span>
        </p>
        <div className="items-center text-medium">
          <span>Increased by</span>
          <span className="font-medium px-1 bg text-medium">+{change}</span>
          <span>this month</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
