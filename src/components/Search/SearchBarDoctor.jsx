"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import DateInput from "../Inputs/DateInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { appointmentFields, doctorFields } from "@/utils/formField/formFIelds";
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
import FormModalWithLabel from "../Modals/FormModalWithLabel";
import dayjs from "dayjs";
import { Axios, summary } from "@/config/summaryAPI";
import toast from "react-hot-toast";
import { AxiosError } from "@/utils/axiosError";

const SearchBarDoctor = () => {
  const {
    clinics,
    setClinics,
    fetchClinicDropdown,
    fetchQualificationDropdown,
    fetchQSpecializationDropdown,
    qualification,
    specialization,
    TOKEN,
  } = useContext(AppContext);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [openModal, setOpenModal] = useState(true);
  const [newPatientCheck, setNewPatientCheck] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchClinicDropdown();
    fetchQualificationDropdown();
    fetchQSpecializationDropdown();
  }, [selectedClinic]);
  const sortedClinic = clinics.map((clinic) => ({
    label: clinic.name,
    value: clinic.id,
  }));
  const [doctorClinics, setDoctorClinics] = useState([
    {
      id: 1,
      clinicId: "",
      startTime: "",
      endTime: "",
      charges: "",
    },
  ]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addDoctorSchema),
    defaultValues: {
      doctorName: "",
      userName: "",
      password: "",
      age: "",
      gender: "",
      address: "",
      specialization: [],
      qualification: [],
      doctorClinic: [
        {
          clinicId: "",
          charges: "",
          startTime: "",
          endTime: "",
          updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        },
      ],
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const age = dayjs().diff(dayjs(data.age), "year");
      const clinicIds = data.doctorClinic.map((clinic) => {
        return clinic.clinicId;
      });
      const payload = {
        name: data.doctorName,
        address: data.address,
        age: age,
        gender: data.gender,
        priority: 1,
        username: data.userName,
        password: data.password,
        type: 3,
        updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        clinicIds: clinicIds,
        qualificationIds: data.qualification,
        specializationIds: data.specialization,
        doctorClinics: data.doctorClinic,
      };

      const response = await Axios({
        ...summary.addOrUpdateDoctor,
        data: payload,
        params: {
          token: TOKEN,
        },
      });

      if (response.data.status == 200) {
        toast.success("Doctor Add Successfully");
        // const newDoctor = [...doctors];
        // newDoctor.push(response?.data?.data);
        // setDoctors(newDoctor);
        setOpenModal(false);
        reset({});
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };

  const handleReset = () => {
    reset({
      doctorName: "",
      userName: "",
      password: "",
      age: "",
      gender: "",
      address: "",
      specialization: [],
      qualification: [],
      doctorClinic: [
        {
          clinicId: "",
          charges: "",
          startTime: "",
          endTime: "",
        },
      ],
    });
  };

  const onChange = (e) => {
    setNewPatientCheck(e.target.checked);
  };
  return (
    <div className="flex gap-2 mt-ratio2">
      <SearchInput placeholder={"Select Doctor"} className="flex-3" />
      <Select
        placeholder="Select Clinic"
        options={sortedClinic}
        className="!h-[35px] placeholder:!text-gray w-full flex-1"
        value={selectedClinic}
        onChange={(value) => {
          setSelectedClinic(value);
        }}
      />
      {/* <SelectInput selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/> */}
      <AddButton onClick={() => setOpenModal(true)}>
        <Plus size={16} className="" />
        Add New Doctor
      </AddButton>
      {openModal && (
        <FormModal
          open={openModal}
          setOpen={setOpenModal}
          title={"Add New Doctor"}
          confirmButton="Add Doctor"
          formFields={doctorFields}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          control={control}
          errors={errors}
          onChange={onChange}
          newPatientCheck={newPatientCheck}
          doctorClinics={doctorClinics}
          setDoctorClinics={setDoctorClinics}
          clinics={sortedClinic}
          qualification={qualification}
          specialization={specialization}
          loader={loader}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

export default SearchBarDoctor;
