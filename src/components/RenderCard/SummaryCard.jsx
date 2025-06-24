import React, { useContext, useEffect } from "react";
import StatCard from "../Cards/StatCard";
import { Building2, Heart, ShoppingCart, User2 } from "lucide-react";
// import patient from '../../assets/icons/patient.png';
import patient from '../../assets/icons/patient.svg';
import earning from '../../assets/icons/earning.svg';
import doctor from '../../assets/icons/doctor.svg';
import appointment from '../../assets/icons/appointment.svg';
import clinic from '../../assets/icons/clinic.svg';
import { AppContext } from "@/provider/AppProvider";
const SummaryCard = () => {
  const {user, doctorSummary, clinicSummary, earningSummary, patientSummary, appointmentSummary, fetchAllSummaryData} = useContext(AppContext)
  useEffect(()=>{
    user && fetchAllSummaryData(user.token)
  },[user])
  const data = [
    {
      icon: clinic,
      title: "TOTAL CLINICS",
      value: clinicSummary?.data?.totalClinics || 0,
      change: clinicSummary?.data?.totalClinicsThisMonth || 0,
      bgColor: "bg-[linear-gradient(90deg,_rgba(230,_54,_69,_1)_0%,_rgba(255,_100,_113,_1)_100%)]",
      show:[5],
    },
    {
      icon: doctor,
      title: "TOTAL DOCTORS",
      value: doctorSummary?.data?.totalDoctors || 0,
      change: doctorSummary?.data?.totalDoctorsThisMonth || 0,
      bgColor: "bg-[linear-gradient(90deg,_rgba(218,_86,_42,_1)_0%,_rgba(253,_120,_76,_1)_100%)]",
      show:[5],
    },
    {
      icon: patient,
      title: "TOTAL PATIENT",
      value: patientSummary?.data?.totalPatient || 0,
      change: patientSummary?.data?.totalPatientsThisMonth || 0,
      bgColor: "bg-[linear-gradient(90deg,_rgba(213,_177,_43,_1)_0%,_rgba(255,_214,_65,_1)_100%)]",
      show:[3, 4, 5],
    },
    {
      icon: appointment,
      title: "TOTAL APPOINTMNET",
      value: appointmentSummary?.data?.totalAppointments || 0,
      change: appointmentSummary?.data?.totalAppointmentsThisMonth || 0,
      bgColor: "bg-[linear-gradient(90deg,_rgba(54,_178,_106,_1)_0%,_rgba(113,_208,_153,_1)_100%)]",
      show:[3, 4, 5],
    },
    {
      icon: earning,
      title: "TOTAL EARNING",
      value: earningSummary?.data?.totalEarnings || 0,
      change: earningSummary?.data?.totalEarningsThisMonth || 0,
      bgColor: "bg-[linear-gradient(90deg,_rgba(9,_93,_201,_1)_0%,_rgba(40,_134,_255,_1)_100%)]",
      show:[3, 4, 5],
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-ratio2 my-ratio2">
      {data.map((item,index)=>{
        if(item.show.includes(parseInt(user?.type))){
          return(
            <StatCard data={item} key={index}/>
          )
        }
      })}
    </div>
  );
};

export default SummaryCard;
