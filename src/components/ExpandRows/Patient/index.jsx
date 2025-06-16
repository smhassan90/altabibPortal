import React, { useContext, useEffect, useState } from "react";
import PatientInformation from "./PatientInformation";
import EditButton from "@/utils/buttons/EditButton";
import PatientHistory from "./PatientHistory";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import Spinner from "@/components/Spinner/Spinner";

const PatientExpandRow = ({ data, mode, setExpandedRow, fetchAppointment }) => {
  const [patientHistory, setPatientHistory] = useState(null);
  const [loader, setLoader] = useState(false);
  const { TOKEN, treatments, fetchTreatmentDropdown } = useContext(AppContext);
  const { patientId } = data;
  const fetchPatientHistory = async (id) => {
    try {
      setLoader(true);
      const response = await Axios({
        ...summary.getPatientHistory,
        params: {
          token: TOKEN,
          doctorId: 0,
          patientId: id,
        },
      });
      if (response.data.status == 200) {
        setPatientHistory(response?.data?.data?.appointments);
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };
  
  console.log(patientHistory, "patientHistory");
  return (
    <>
      <div className="mx-ratio2 px-ratio2 py-ratio2 bg-Bluish text-small text-gray-700">
        <PatientInformation 
          data={data} 
          mode={mode} 
          setExpandedRow={setExpandedRow} 
          fetchAppointment={fetchAppointment}
        />
        {data.ststus == 1 && <EditButton
          onClick={() => fetchPatientHistory(patientId)}
          className={"mt-ratio2"}
        >
          {loader ? <Spinner size={20} style={{ color: "white" }} /> : "Show History"}
        </EditButton>}
      </div>
      {patientHistory && <PatientHistory data={data} patientHistory={patientHistory} />}
    </>
  );
};

export default PatientExpandRow;
