"use client";
import React from "react";
// import StatCard from './components/StatCard';
import { Building2, User2, ShoppingCart, Heart, Clock } from "lucide-react"; // Example icons
import StatCard from "@/components/Cards/StatCard";
import SummaryCard from "@/components/RenderCard/SummaryCard";
import Clinics from "@/components/ClinicCard";

const page = () => {
  return (
    <div>
      <SummaryCard/>
      <Clinics/>      
    </div>
  );
};

export default page;
