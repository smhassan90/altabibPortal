import React, { useContext, useEffect, useState } from "react";
import ClinicCard from "./ClinicCard";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
const Clinics = () => {
  const data = [
    {
      clinicName: "Diabates & Foot Care",
      timing: "08:00 AM - 01:00 PM",
      charges: 3000,
      appointments: 50,
    },
    {
      clinicName: "Diabates & Foot Care",
      timing: "08:00 AM - 01:00 PM",
      charges: 3000,
      appointments: 50,
    },
    {
      clinicName: "Diabates & Foot Care",
      timing: "08:00 AM - 01:00 PM",
      charges: 3000,
      appointments: 50,
    },
  ];
  const { TOKEN } = useContext(AppContext)
  const [doctorClinics, setDoctorClinics] = useState([]);
  const getClinics = async () => {
    try {
      const response = await Axios({
        ...summary.getDoctorClinics,
        params: {
          token: TOKEN,
        },
      });
      if (response.data.status == 200) {
        setDoctorClinics(response.data.data);
      }
    } catch (error) {
      AxiosError(errorMap);
    }
  };
   useEffect(() => {
    getClinics();
  }, []);

  console.log(doctorClinics,"doctorClinics?.doctorClinicDALS")
  return (
    <div>
      <h2 className="font-semibold text-small 2xl:text-medium">My Clinics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-ratio2 my-ratio2">
        {doctorClinics?.doctorClinicDALS?.map((clinic, index) => (
          <ClinicCard clinic={clinic} key={index} doctorId={doctorClinics?.id}/>
        ))}
      </div>
    </div>
  );
};

export default Clinics;
