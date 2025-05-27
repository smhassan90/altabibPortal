import React, { useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import { ChevronDown, CircleCheck, Trash2 } from "lucide-react";
import CustomButom from "@/utils/buttons/AddButton";
import AddButton from "@/utils/buttons/AddButton";
import { Select } from "antd";

export function TableRow({ data, columns, index, isExpanded }) {
  const [treatments, setTreatments] = useState([
    { id: "1", treatment: "", description: "" },
  ]);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const inputcss = "h-[28px] px-2 border-b-1 border-gray-300 outline-none";
  const Input = ({ label, value }) => {
    return (
      <div className="flex justify-between items-end text-text">
        <h2 className="text-gray">{label} :</h2>
        <input type="text" value={value} className={inputcss} />
      </div>
    );
  };
  const inputFields = [
    { label: "Blood Pressure", value: "80/120" },
    { label: "Weight", value: "40kg" },
    { label: "Prescription", value: "Panadol" },
    { label: "Followup Date", value: "30-05-2025" },
    { label: "Diagnosis", value: "Lungs Issue" },
    { label: "Token Number", value: "2" },
    { label: "Charges", value: "2000" },
  ];
  const treatmentOptions = [
    "Medication",
    "Physical Therapy",
    "Surgery",
    "Consultation",
    "Lab Tests",
    "X-Ray",
    "Blood Test",
    "Follow-up Visit",
  ];
  const addTreatment = () => {
    const newTreatment = {
      id: Date.now().toString(),
      treatment: "",
      description: "",
    };
    setTreatments([...treatments, newTreatment]);
  };
  return (
    <>
      <tr className={`hover:bg-gray-100`}>
        {columns.map((column) => (
          <td
            key={column.key}
            className="px-6 py-4 whitespace-nowrap text-small text-text"
          >
            {column.render
              ? column.render(data[column.key], data)
              : data[column.key]}
          </td>
        ))}
      </tr>
      {isExpanded && (
        <tr className="">
          <td colSpan={columns.length} className="">
            <div className="mx-4 px-4 py-ratio1 bg-background text-small text-gray-700">
              <h2 className="text-text">Patient Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-ratio1 my-ratio2">
                {inputFields.map((field, idx) => (
                  <Input key={idx} label={field.label} value={field.value} />
                ))}
                <div className="flex justify-between items-end text-text">
                  <h2 className="text-gray">Treatments :</h2>
                  <AddButton onClick={addTreatment}>
                    <CircleCheck size={16} />
                    Add Treatment
                  </AddButton>
                </div>
              </div>
              <div className="space-y-ratio2 pt-ratio2">
                {treatments.map((treatment, index) => (
                  <div
                    key={treatment.id}
                    className="lg:max-w-[50%] bg-white border border-border rounded-medium p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">Treatment {index + 1}</h4>
                      {treatments.length > 1 && (
                        <button
                          onClick={() => removeTreatment(treatment.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h2 className="text-gray-600">Select Treatment</h2>
                        <SelectInput options={treatmentOptions}/>
                      </div>

                      <div className="space-y-2">
                        <h2 className="text-gray-600">Description</h2>
                        <textarea />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
