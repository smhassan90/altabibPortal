"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import {
  clinicFields,
  QualificationFields,
  SpecializationFields,
} from "@/utils/formField/formFIelds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAppointmentSchema,
  addClinicSchema,
  addDoctorSchema,
  addSpecializationSchema,
  directAppointmentSchema,
} from "@/utils/schema";
import { SearchInput, SelectInputWithoutLabel } from "../formInput/TextInput";
import { DateInput } from "../Inputs/DateInput";
import { AppContext } from "@/provider/AppProvider";
import { Axios, summary } from "@/config/summaryAPI";
import toast from "react-hot-toast";
import { AxiosError } from "@/utils/axiosError";
import dayjs from "dayjs";
import qs from "qs";
import { Select } from "antd";
const SearchBarSpecialization = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newPatientCheck, setNewPatientCheck] = useState(false);
  const [loader, setLoader] = useState(false);

  const { doctors, patients, fetchPatients, fetchDoctorDropdown, user, TOKEN } =
    useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addSpecializationSchema),
    defaultValues: {
      specialization: "",
      color: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const payload = {
        name: data.specialization,
        colorCode: data.color,
        updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      const response = await Axios({
        ...summary.addSpecialization,
        data: payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        toast.success("specialization Add Successfully");
        // const newSpecialization = [...specialization];
        // newSpecialization.push(response?.data?.data);
        // setSpecialization(newSpecialization);
        setOpenModal(false);
        handleReset();
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };

  function handleReset(){
    reset({
      specialization: "",
      color: "",
    });
  };
  const onChange = (e) => {
    setNewPatientCheck(e.target.checked);
  };
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-ratio2">
      <SearchInput placeholder={"Search"} className="flex-3" />
      <AddButton onClick={() => setOpenModal(true)}>
        <Plus size={16} className="" />
        Add New Specialization
      </AddButton>
      {openModal && (
        <FormModal
          open={openModal}
          setOpen={setOpenModal}
          title={"Add New Specialization"}
          confirmButton="Add Specialization"
          formFields={SpecializationFields}
          handleSubmit={handleSubmit}
          setValue={setValue}
          control={control}
          errors={errors}
          onChange={onChange}
          onSubmit={onSubmit}
          loader={loader}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

export default SearchBarSpecialization;
