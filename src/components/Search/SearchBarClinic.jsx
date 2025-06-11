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
const SearchBarClinic  = ({ visitDate, setVisitDate, selectedStatus, setSelectedStatus }) => {
  const [openModal, setOpenModal] = useState(false);
  const [newPatientCheck, setNewPatientCheck] = useState(false);
  const [loader, setLoader] = useState(false);
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      treatmentName: "",
      treatmentDescription: "",
    },
  ]);

  const { doctors, patients, fetchPatients, fetchDoctorDropdown, user, TOKEN } =
    useContext(AppContext);

  useEffect(() => {
    fetchDoctorDropdown();
    fetchPatients();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      newPatientCheck ? directAppointmentSchema : addAppointmentSchema
    ),
    defaultValues: {
      patientId: "",
      patientName: "",
      dob: "",
      contactNumber: "",
      gender: "",
      doctorId: "",
      clinicId: user?.username || "",
      clinicName: user?.name || "",
      visitDate: "",
      charges: "",
      weight: "",
      bloodPressure: "",
      prescription: "",
      diagnosis: "",
      treatments: [
        {
          treatmentName: "",
          treatmentDescription: "",
        },
      ],
    },
  });

  // Automatically set charges based on selected doctor and clinic
  useEffect(() => {
    const selectedDoctor = doctors.find(
      (doc) => doc.id === Number(watch("doctorId"))
    );
    if (selectedDoctor) {
      const clinic = selectedDoctor.clinic.find(
        (c) => c.clinic.id === Number(watch("clinicId"))
      );
      if (clinic) {
        setValue("charges", clinic.charges.toString());
      } else {
        setValue("charges", "");
      }
    }
  }, [watch("doctorId")]);

//   const status = [
//     { label: "All Status", value: "all" },
//     { label: "Successfull", value: "1" },
//     { label: "Pending", value: "0" },
//   ];

  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const visiteDate = dayjs(data.visitDate).format("YYYY-MM-DD");
      const payload = {
        patientName: data.patientName,
        clinicName: data.clinicName,
        doctorName: data.doctorName,
        visitDate: visiteDate,
        tokenNumber: 0,
        status: 0,
        clinicTotalAppointments: 0,
        clinicLastAppointmentToken: 0,
        charges: data.charges,
        prescription: data.prescription || "",
        diagnosis: data.diagnosis || "",
        age: 0,
        weight: data.weight || "",
        bloodPressure: data.bloodPressure || "",
        followupDate: data.followupDate || "",
        patientId: data.patientId || 0,
        clinicId: data.clinicId,
        doctorId: data.doctorId,
        treatments: [],
      };
      console.log(payload);
      const response = await Axios({
        ...summary.setAppointment,
        params: {
          token: TOKEN,
          appointment: JSON.stringify(payload),
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: true });
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Appointment Add Successfully");
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

  const onNewPatient = async (data) => {
    console.log(data, "data");
    try {
      setLoader(true);
      const visiteDate = dayjs(data.visitDate).format("YYYY-MM-DD");
      const dateOfBirth = dayjs(data.dob).format("YYYY-MM-DD");
      const payload = {
        appointment: {
          patientName: data.patientName,
          clinicName: data.clinicName,
          doctorName: data.doctorName,
          visitDate: visiteDate,
          tokenNumber: 0,
          status: 0,
          clinicTotalAppointments: 0,
          clinicLastAppointmentToken: 0,
          charges: data.charges,
          prescription: data.prescription || "",
          diagnosis: data.diagnosis || "",
          age: 0,
          weight: data.weight || 0,
          bloodPressure: data.bloodPressure || "",
          followupDate: data.followupDate || "",
          patientId: data.patientId || 0,
          clinicId: data.clinicId,
          doctorId: data.doctorId,
          treatments: [],
        },
        patient: {
          name: data.patientName,
          gender: data.gender,
          cellNumber: data.contactNumber,
          dob: dateOfBirth,
        },
      };
      console.log(payload);
      const response = await Axios({
        ...summary.directPatientAppointment,
        data: payload,
        params: {
          token: TOKEN,
        },
      });
      if (response?.data?.status == 200) {
        toast.success("Appointment Add Successfully");
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
      patientId: "",
      patientName: "",
      dob: "",
      contactNumber: "",
      clinicId: user?.username || "",
      clinicName: user?.name || "",
      gender: "",
      doctorId: "",
      visitDate: "",
      charges: "",
      weight: "",
      bloodPressure: "",
      prescription: "",
      diagnosis: "",
      treatments: [
        {
          treatmentName: "",
          treatmentDescription: "",
        },
      ],
    });
  };
  const onChange = (e) => {
    setNewPatientCheck(e.target.checked);
  };
  return (
    <div className="flex gap-2 mt-ratio2">
      <SearchInput placeholder={"Search"} className="flex-3" />
      {/* <Select
        options={status}
        className="!h-[35px] placeholder:!text-gray w-full flex-1"
        value={selectedStatus}
        onChange={(value) => {
          setSelectedStatus(value);
        }}
      /> */}
      {/* <DateInput visitDate={visitDate} setVisitDate={setVisitDate} /> */}
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
          newPatientCheck={newPatientCheck}
          onSubmit={onSubmit}
          onNewPatient={onNewPatient}
          treatments={treatments}
          setTreatments={setTreatments}
          doctors={doctors}
          patients={patients}
          loader={loader}
          handleReset={handleReset}
        />
      )}
    </div>
  );
};

export default SearchBarClinic;
