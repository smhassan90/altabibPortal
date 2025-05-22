"use client";
import React from "react";
// import StatCard from './components/StatCard';
import { Building2, User2, ShoppingCart, Heart, Clock } from "lucide-react"; // Example icons
import StatCard from "@/components/Cards/StatCard";
import SummaryCard from "@/components/RenderCard/SummaryCard";

const page = () => {
  return (
    <div>
      <SummaryCard/>
      {/* <div className="ml-8">
        <h1 className="font-semibold text-large">My Clinics</h1>
        <div className="w-[400px] bg-white rounded-lg shadow-md p-4 mb-4 gap-2 space-x-3 ">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Building2 className="h-5 w-5 text-blue-500 mr-2" />
              <span className="font-semibold text-sm">Clinic:</span>
            </div>
            <span className="text-sm font-medium">Diabates & Foot Care</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-semibold text-sm">Time:</span>
            </div>
            <span className="text-sm font-medium">08:00 AM-01:00 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-2" />
              <span className="font-semibold text-sm">Charges:</span>
            </div>
            <span className="text-sm font-medium">3,000/-</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default page;
