"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import DateInput from "../Inputs/DateInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { appointmentFields } from "@/utils/formField/formFIelds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAppointmentSchema, addDoctorSchema } from "@/utils/schema";
import { SearchInput, SelectInputs, SelectInputWithoutLabel } from "../formInput/TextInput";
import { Input } from "antd";

const SearchBarDoctor = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [openModal, setOpenModal] = useState(true);
  const [newPatientCheck, setNewPatientCheck] = useState(false);
  const clinic = [
    { label: "Clinic A", value: "clinic_a" },
    { label: "Clinic B", value: "clinic_b" },
    { label: "Clinic C", value: "clinic_c" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addAppointmentSchema),
    defaultValues: {
      patientId: "",
      patientName: "",
      dob: "",
      contactNumber: "",
      gender: "",
      doctorId: "",
      clinicId: "",
      clinicName: "",
      visitDate: "",
      charges: "",
      weight: "",
      bloodPressure: "",
      prescription: "",
      diagnosis: "",
      treatments: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data, "data");
  };
  const onChange = (e) => {
    setNewPatientCheck(e.target.checked);
  };
  return (
    <div className="flex gap-2 mt-ratio2">
      <SearchInput placeholder={"Select Doctor"} className="flex-3"/>
      <SelectInputWithoutLabel
        input={"Select Clinic"}
        type={"select"}
        control={control}
        errors={errors}
        name={"clinicId"}
        options={clinic}
        className={"flex-1"}
      />
      {/* <SelectInput selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/> */}
      <AddButton onClick={() => setOpenModal(true)}>
        <Plus size={16} className="" />
        Add Doctor
      </AddButton>
      {/* {openModal && (
        <FormModal
          open={openModal}
          setOpen={setOpenModal}
          title={"Add New Appointment"}
          formFields={appointmentFields}
          handleSubmit={handleSubmit}
          control={control}
          errors={errors}
          onChange={onChange}
          newPatientCheck={newPatientCheck}
        />
      )} */}
    </div>
  );
};

export default SearchBarDoctor;
