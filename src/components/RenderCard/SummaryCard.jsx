import React from "react";
import StatCard from "../Cards/StatCard";
import { Building2, Heart, ShoppingCart, User2 } from "lucide-react";
// import patient from '../../assets/icons/patient.png';
import patient from '../../assets/icons/patient.svg';
import earning from '../../assets/icons/earning.svg';
import doctor from '../../assets/icons/doctor.svg';
import appointment from '../../assets/icons/appointment.svg';
import clinic from '../../assets/icons/clinic.svg';
const SummaryCard = () => {
  const data = [
    {
      icon: clinic,
      title: "TOTAL CLINICS",
      value: "12",
      change: "20",
      bgColor: "bg-[linear-gradient(90deg,_rgba(230,_54,_69,_1)_0%,_rgba(255,_100,_113,_1)_100%)]",
    },
    {
      icon: doctor,
      title: "TOTAL DOCTORS",
      value: "134",
      change: "54",
      bgColor: "bg-[linear-gradient(90deg,_rgba(218,_86,_42,_1)_0%,_rgba(253,_120,_76,_1)_100%)]",
    },
    {
      icon: patient,
      title: "TOTAL PATIENT",
      value: "29",
      change: "18",
      bgColor: "bg-[linear-gradient(90deg,_rgba(213,_177,_43,_1)_0%,_rgba(255,_214,_65,_1)_100%)]",
    },
    {
      icon: appointment,
      title: "TOTAL APPOINTMNET",
      value: "78",
      change: "12",
      bgColor: "bg-[linear-gradient(90deg,_rgba(54,_178,_106,_1)_0%,_rgba(113,_208,_153,_1)_100%)]",
    },
    {
      icon: earning,
      title: "TOTAL EARNING",
      value: "78",
      change: "12",
      bgColor: "bg-[linear-gradient(90deg,_rgba(9,_93,_201,_1)_0%,_rgba(40,_134,_255,_1)_100%)]",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-ratio2 my-ratio2">
      {data.map((item,index)=><StatCard data={item} key={index}/>)}
    </div>
  );
};

export default SummaryCard;
