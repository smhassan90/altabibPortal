import React from "react";
import ClinicCard from "./ClinicCard";
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
  return (
    <div>
      <h2 className="font-semibold">My Clinics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-ratio2 my-ratio2">
        {data.map((clinic, index) => (
          <ClinicCard clinic={clinic} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Clinics;
