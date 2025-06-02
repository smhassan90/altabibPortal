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
import PatientHistory from "../PatientHistory";

export function TableRow({
  data,
  columns,
  index,
  isExpanded,
  register,
  errors,
  control,
}) {
  const [treatments, setTreatments] = useState([
    { id: Date.now().toString(), treatment: "", description: "" },
  ]);
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
  const addTreatment = () => {
    const newTreatment = {
      id: Date.now().toString(),
      treatment: "",
      description: "",
    };
    setTreatments([...treatments, newTreatment]);
    console.log([...treatments, newTreatment]);
  };
  const removeTreatment = (id) => {
    if (treatments.length > 1) {
      setTreatments(treatments.filter((t) => t.id !== id));
    }
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
      {!isExpanded && (
        <tr className="">
          <td colSpan={columns.length} className="">
            <div className="mx-ratio2 px-ratio2 py-ratio2 bg-background text-small text-gray-700">
              <h2 className="text-text text-medium 2xl:text-large font-semibold">
                Patient Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-ratio1 gap-y-ratio2">
                {checkUpFields.map((field, idx) => {
                  if (field?.type == "text") {
                    return (
                      <TextInputsWithUnderLine
                        key={idx}
                        label={field?.label}
                        // input={field?.input}
                        type={field?.type}
                        register={register}
                        errors={errors}
                        name={field?.name}
                        control={control}
                        className="flex items-end justify-between gap-2 "
                      />
                    );
                  } else if (field?.type == "date") {
                    return (
                      <DateInputWithValidation
                        key={idx}
                        label={field?.label}
                        // input={field?.input}
                        type={field?.type}
                        register={register}
                        errors={errors}
                        name={field?.name}
                        control={control}
                        className="flex items-end justify-between gap-2"
                      />
                    );
                  }
                })}
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-ratio2 mt-ratio1">
                {checkUpFields?.slice(-2)?.map((field, idx) => (
                  <TextAreaInputWithLabel
                    key={idx}
                    label={field?.label}
                    input={field?.input}
                    type={field?.type}
                    register={register}
                    errors={errors}
                    name={field?.name}
                    control={control}
                    className="flex space-y-ratio2"
                  />
                ))}
              </div>
              <div className="grid grid-cols-1 gap-4 mt-ratio2 border-t pt-ratio2 border-border">
                {treatments.map((treatment, index) => (
                  <div key={treatment.id} className="">
                    <div className="flex justify-between gap-4">
                      <SingleSelectInputs
                        label={"Treatment Name"}
                        input={"Treatment"}
                        type={"select"}
                        control={control}
                        errors={errors}
                        name={"treatment"}
                        className="flex !mb-0 flex-6"
                      />
                      <TextAreaInputWithLabel
                        label={"Description"}
                        input={"Description"}
                        type={"textarea"}
                        errors={errors}
                        name={"treatmentDescription"}
                        control={control}
                        className="flex space-y-ratio2 flex-10"
                        isCheckup={true}
                      />
                      <div className="flex items-start justify-end flex-1">
                        <div className="flex gap-2">
                          {treatments.length > 1 && (
                            <DeleteButton
                              onClick={() => removeTreatment(treatment?.id)}
                              className={"!rounded-full !px-2 !py-2"}
                            >
                              <Trash2 size={16} />
                            </DeleteButton>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <AddButton onClick={addTreatment}>Add Treatment</AddButton>
            </div>
            <PatientHistory/>
          </td>
        </tr>
      )}
    </>
  );
}
