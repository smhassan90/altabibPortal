"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { QualificationFields } from "@/utils/formField/formFIelds";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addQualificationSchema } from "@/utils/schema";
import { SearchInput } from "../formInput/TextInput";
import { AppContext } from "@/provider/AppProvider";
import { Axios, summary } from "@/config/summaryAPI";
import toast from "react-hot-toast";
import { AxiosError } from "@/utils/axiosError";
import dayjs from "dayjs";
import qs from "qs";
import { Select } from "antd";


const SearchBarQualification = ({qualification, setQualification}) => {
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
    resolver: zodResolver(addQualificationSchema),
    defaultValues: {
      qualification: "",
      color: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const payload = {
        name: data.qualification,
        colorCode: data.color,
        updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      const response = await Axios({
        ...summary.addQualification,
        data: payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        console.log(response?.data?.data,"response?.data?.data")
        toast.success("Qualification Add Successfully");
        const newQualification = [...qualification];
        newQualification.push(response?.data?.data);
        setQualification(newQualification);
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
      qualification: "",
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
        Add New Qualification
      </AddButton>
      {openModal && (
        <FormModal
          open={openModal}
          setOpen={setOpenModal}
          title={"Add New Qualification"}
          confirmButton="Add Qualification"
          formFields={QualificationFields}
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

export default SearchBarQualification;
