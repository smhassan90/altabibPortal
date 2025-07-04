"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import DateInput from "../Inputs/DateInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { appointmentFields, doctorFields } from "@/utils/formField/formFIelds";
import { useFieldArray, useForm } from "react-hook-form";
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

const SearchBarDoctor = ({doctors, setDoctors, clinicId, setClinicId, searchDoctor, setSearchDoctor}) => {
  const {
    clinics,
    setClinics,
    fetchClinicDropdown,
    fetchQualificationDropdown,
    fetchQSpecializationDropdown,
    qualification,
    specialization,
    TOKEN,
    user
  } = useContext(AppContext);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newPatientCheck, setNewPatientCheck] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchClinicDropdown();
    fetchQualificationDropdown();
    fetchQSpecializationDropdown();
  }, []);

  const sortedClinic = clinics?.map((clinic) => ({
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
      type:"",
      specialization: [],
      qualification: [],
      doctorClinic: [
        {
          id: 1,
          clinicId: "",
          charges: "",
          startTime: "",
          endTime: "",
          updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        },
      ],
    },
  });

  const { remove } = useFieldArray({
    control,
    name: "doctorClinic",
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const clinicIds = data.doctorClinic.map((clinic) => {
        return clinic.clinicId;
      });
      const payload = {
        name: data.doctorName,
        address: data.address,
        age: data.age,
        gender: data.gender,
        priority: 1,
        username: data.userName,
        password: data.password,
        type: data.type,
        updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        clinicIds: clinicIds,
        qualificationIds: data.qualification,
        specializationIds: data.specialization,
        doctorClinics: data.doctorClinic.map(clinic=>{
          return{
            clinicId: clinic.clinicId,
            charges: clinic.charges,
            startTime: clinic.startTime,
            endTime: clinic.endTime,
            updateDate: clinic.updateDate,
          }
        }),
      };
      console.log(payload,"payload")
      const response = await Axios({
        ...summary.addOrUpdateDoctor,
        data: payload,
        params: {
          token: TOKEN,
        },
      });

      if (response.data.status == 200) {
        toast.success("Doctor Add Successfully");
        const newDoctor = [...doctors];
        newDoctor.push(response?.data?.data);
        setDoctors(newDoctor);
        setOpenModal(false);
        reset({});
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
      setDoctorClinics([
        {
          id: 1,
          clinicId: "",
          charges: "",
          startTime: "",
          endTime: "",
          updateDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        },
      ])
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

  const removeClinics = (clinic, index) => {
    console.log(clinic, "clinic");
    console.log(index, "index");
    if (doctorClinics.length > 1) {
      // setDoctorClinics(doctorClinics.filter((item) => item.id !== clinic?.id));
      setDoctorClinics(doctorClinics.filter((_, i) => i !== index));
      remove(index);
    }
  };


  return (
    <div className="flex flex-col md:flex-row gap-2 mt-ratio2">
      <SearchInput 
        placeholder={"Select Doctor"} 
        className="flex-2 lg:flex-3" 
        value={searchDoctor} 
        setValue={setSearchDoctor}
      />
      {user?.type == 5 && <Select
        placeholder="Select Clinic"
        options={sortedClinic || []}
        className="!h-[35px] placeholder:!text-gray w-full flex-2 lg:flex-1"
        value={selectedClinic}
        allowClear
        onChange={(value) => {
          setSelectedClinic(value);
          setClinicId(value ? value : 0);
        }}
      />}
      {user?.type == 5 && <AddButton onClick={() => setOpenModal(true)}>
        <Plus size={16} className="" />
        Add New Doctor
      </AddButton>}
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
          removeClinics={removeClinics}
        />
      )}
    </div>
  );
};

export default SearchBarDoctor;
