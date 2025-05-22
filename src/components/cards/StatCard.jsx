"use client";
import React from "react";

const StatCard = ({ icon, title, value, change,bgColor }) => {
  return (
    <div className={`rounded-2xl p-3  text-white flex items-center ${bgColor}`}>
      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-4">
        <div className="bg-white rounded-lg p-4 w-14 h-14 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-white/90 font-medium uppercase text-medium tracking-wide">
          {title}
        </h3>
        <p className="text-xlarge mt-1">
          {" "}
          <span className="">+{change}</span>
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
