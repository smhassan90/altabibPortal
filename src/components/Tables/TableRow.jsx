import React, { useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import { ChevronDown, CircleCheck, Plus, Trash2 } from "lucide-react";
import CustomButom from "@/utils/buttons/AddButton";
import AddButton from "@/utils/buttons/AddButton";
import { Select } from "antd";
import {
  SelectInputs,
  SingleSelectInputs,
  TextAreaInput,
  TextAreaInputWithLabel,
  TextInputs,
  TextInputsWithUnderLine,
} from "../formInput/TextInput";
import { checkUpFields } from "@/utils/formField/formFIelds";
import { DateInput, DateInputWithValidation } from "../Inputs/DateInput";
import DeleteButton from "@/utils/buttons/DeleteButton";
import PatientHistory from "../ExpandRows/Patient/PatientHistory";
import EditButton from "@/utils/buttons/EditButton";
import PatientInformation from "../ExpandRows/Patient/PatientInformation";
import PatientExpandRow from "../ExpandRows/Patient";
import ClinicExpandRow from "../ExpandRows/Clinic";
import DoctorExpandRow from "../ExpandRows/Doctor";

export function TableRow({
  data,
  columns,
  index,
  isExpanded,
  setExpandedRow,
  fetchAppointment,
  register,
  errors,
  control,
  mode,
  tableName
}) {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const inputcss = "h-[28px] px-2 border-b-1 border-gray-300 outline-none";
  const Input = ({ label, value }) => {
    return (
      <div className="flex justify-between items-end text-text">
        <h2 className="text-gray">{label} :</h2>
        <input type="text" value={value ? value : ""} className={inputcss} />
      </div>
    );
  };
  const inputFields = [
    { label: "Blood Pressure", value: "80/120" },
    { label: "Weight", value: "40kg" },
    { label: "Followup Date", value: "30-05-2025" },
    { label: "Token Number", value: "2" },
    { label: "Charges", value: "2000" },
    { label: "Prescription", value: "Panadol" },
    { label: "Diagnosis", value: "Lungs Issue" },
  ];
  const treatmentOptions = [
    { label: "Blood Pressure", value: "Blood Pressure" },
    { label: "Physical Therapy", value: "Physical Therapy" },
    { label: "Surgery", value: "Surgery" },
    { label: "Consultation", value: "Consultation" },
    { label: "Lab Tests", value: "Lab Tests" },
    { label: "Blood Test", value: "Blood Test" },
    { label: "Follow-up Visit", value: "Follow-up Visit" },
  ];
  return (
    <>
      <tr className={`hover:bg-gray-100`}>
        {columns.map((column) => (
          <td
            key={column.key}
            className="px-6 py-4 whitespace-nowrap text-small 2xl:text-medium text-text"
          >
            {column.render
              ? column.render(data[column.key], data)
              : data[column.key]}
          </td>
        ))}
      </tr>
      {isExpanded && (
        <tr className="">
          {tableName === "Appointment" && (
          <td colSpan={columns.length} className="">
            <PatientExpandRow 
              data={data} 
              mode={mode} 
              setExpandedRow={setExpandedRow} 
              fetchAppointment={fetchAppointment}
            />
          </td>
          )}
          {tableName === "Clinic" && (
          <td colSpan={columns.length} className="">
            <ClinicExpandRow
              data={data} 
              mode={mode} 
              setExpandedRow={setExpandedRow} 
            />
          </td>
          )}
          {tableName === "Doctor" && (
          <td colSpan={columns.length} className="">
            <DoctorExpandRow
              data={data} 
              mode={mode} 
              setExpandedRow={setExpandedRow} 
            />
          </td>
          )}
        </tr>
      )}
    </>
  );
}
