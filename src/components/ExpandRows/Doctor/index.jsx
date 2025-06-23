import React, { useContext, useEffect, useState } from "react";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import Spinner from "@/components/Spinner/Spinner";
import DoctorInformation from "./DoctorInformation";

const DoctorExpandRow = ({ data, mode, setExpandedRow, fetchAppointment }) => {
  const [patientHistory, setPatientHistory] = useState(null);
  const [loader, setLoader] = useState(false);
  const { TOKEN } = useContext(AppContext);
  const { patientId } = data;
  // console.log(patientHistory, "patientHistory");
  return (
    <>
      <div className="mx-ratio2 px-ratio2 py-ratio2 bg-Bluish text-small text-gray-700">
        <DoctorInformation data={data} mode={mode} setExpandedRow={setExpandedRow} fetchAppointment={fetchAppointment}/>
      </div>
    </>
  );
};

export default DoctorExpandRow;
