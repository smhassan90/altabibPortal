"use client"
import React, { useContext } from "react";
import { Building2, User2, ShoppingCart, Heart, Clock } from "lucide-react"; // Example icons
import StatCard from "@/components/Cards/StatCard";
import SummaryCard from "@/components/RenderCard/SummaryCard";
import Clinics from "@/components/ClinicCard";
import { AppContext } from "@/provider/AppProvider";

const page = () => {
  const {user} = useContext(AppContext)
  return (
    <div>
      <SummaryCard/>
      {user?.type === 3 && <Clinics/>}
    </div>
  );
};

export default page;
