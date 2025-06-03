import React from "react";
import PatientInformation from "./PatientInformation";
import EditButton from "@/utils/buttons/EditButton";
import PatientHistory from "./PatientHistory";

const PatientExpandRow = ({data}) => {
  return (
    <>
      <div className="mx-ratio2 px-ratio2 py-ratio2 bg-background text-small text-gray-700">
        <PatientInformation data={data}/>
        <EditButton className={"mt-ratio2"}>Show History</EditButton>
      </div>
      <PatientHistory data={data}/>
    </>
  );
};

export default PatientExpandRow;
