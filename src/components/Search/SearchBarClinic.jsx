"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { clinicFields } from "@/utils/formField/formFIelds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAppointmentSchema,
  addClinicSchema,
  addDoctorSchema,
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
const SearchBarClinic  = ({ clinics, setClinics }) => {
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
    resolver: zodResolver(addClinicSchema),
    defaultValues: {
      name: "",
      address: "",
      lat: "",
      lng: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const payload = {
        name: data.name,
        address: data.address,
        LatLong:`${data.lat},${data.lng}`
      };
      console.log(payload);
      const response = await Axios({
        ...summary.addClinic,
        data:payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Clinic Add Successfully");
        const copyArr = [...clinics]
        copyArr.push(response?.data?.data)
        setClinics(copyArr)
        reset({});
      } else {
        toast.error(`Failed ${response?.data?.status}`);
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
      setOpenModal(false);
    }
  };

  const handleReset = () => {
    reset({
      name: "",
      address: "",
      lat: "",
      lng: "",
    });
  };
  const onChange = (e) => {
    setNewPatientCheck(e.target.checked);
  };
  return (
    <div className="flex gap-2 mt-ratio2">
      <SearchInput placeholder={"Search"} className="flex-3" />
      <AddButton onClick={() => setOpenModal(true)}>
        <Plus size={16} className="" />
        Add New Clinic
      </AddButton>
      {openModal && (
        <FormModal
          open={openModal}
          setOpen={setOpenModal}
          title={"Add New Clinic"}
          confirmButton="Add Clinic"
          formFields={clinicFields}
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

export default SearchBarClinic;
