"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import DateInput from "../Inputs/DateInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { appointmentFields } from "@/utils/formField/formFIelds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAppointmentSchema, addDoctorSchema } from "@/utils/schema";
import {
  SearchInput,
  SelectInputs,
  SelectInputWithoutLabel,
} from "../formInput/TextInput";
import { Input, Select } from "antd";
import { AppContext } from "@/provider/AppProvider";

const SearchBarPatient = ({selectedDoctor, setSelectedDoctor, selectedClinic, setSelectedClinic}) => {
  const { doctors, clinics, patients, fetchPatients, fetchDoctorDropdown, fetchClinicDropdown, user, TOKEN } = useContext(AppContext);
  useEffect(() => {
    fetchClinicDropdown()
    fetchDoctorDropdown();
    fetchPatients();
  }, []);
  console.log(doctors,"doctors")
  const sortedDoctor = doctors.map((doctor) => ({
    label: doctor.name,
    value: doctor.id,
  }));
  const sortedClinics = clinics.map((doctor) => ({
    label: doctor.name,
    value: doctor.id,
  }));

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
      <SearchInput placeholder={"Select Doctor"} className="flex-3" />
      <Select
        placeholder="Select Doctor"
        options={sortedDoctor}
        className="!h-[35px] placeholder:!text-gray w-full flex-1"
        value={selectedDoctor}
        allowClear
        onChange={(value) => {
          setSelectedDoctor(value);
        }}
      />
      {user.type == 5 && <Select
        placeholder="Select Clinic"
        options={sortedClinics}
        className="!h-[35px] placeholder:!text-gray w-full flex-1"
        value={selectedClinic}
        allowClear
        onChange={(value) => {
          setSelectedClinic(value);
        }}
      />}
      {/* <SelectInput selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/> */}
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

export default SearchBarPatient;
