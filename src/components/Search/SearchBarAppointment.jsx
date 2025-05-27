"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import SearchInput from "../Inputs/SearchInput";
import SelectInput from "../Inputs/SelectInput";
import DateInput from "../Inputs/DateInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { appointmentFields } from "@/utils/formField/formFIelds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAppointmentSchema, addDoctorSchema } from "@/utils/schema";

const SearchBarAppointment = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [openModal, setOpenModal] = useState(true);
  const [newPatientCheck, setNewPatientCheck] = useState(false);
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
      <SearchInput />
      <SelectInput
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
      {/* <SelectInput selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/> */}
      <DateInput />
      <AddButton onClick={() => setOpenModal(true)}>
        <Plus size={16} className="" />
        Add New Appointment
      </AddButton>
      {/* <button className="flex-1 bg-secondary text-white rounded-large flex items-center justify-center gap-2 px-4">
        <Plus size={16} className=""/>
        <span className="text-center">Add New Appointment</span>
      </button> */}
      {openModal && (
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
      )}
    </div>
  );
};

export default SearchBarAppointment;
