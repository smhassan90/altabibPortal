"use client";
import { ChevronDown, Plus, Search } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectInput from "../Inputs/SelectInput";
import AddButton from "@/utils/buttons/AddButton";
import FormModal from "../Modals/FormModal";
import { appointmentFields } from "@/utils/formField/formFIelds";
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
const SearchBarAppointment = ({
  visitDate,
  setVisitDate,
  selectedStatus,
  setSelectedStatus,
  filterAppointment,
  setFilterAppointment,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [newPatientCheck, setNewPatientCheck] = useState(false);
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState(false);
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      name: "",
      detail: "",
    },
  ]);

  const {
    doctors,
    patients,
    fetchPatients,
    treatments: treatmentBank,
    fetchDoctorDropdown,
    user,
    TOKEN,
    fetchTreatmentDropdown,
  } = useContext(AppContext);

  useEffect(() => {
    if (user.type == 4) {
      fetchDoctorDropdown();
      fetchPatients();
    }
    if (user.type == 4 || user.type == 3) {
      fetchTreatmentDropdown();
    }
  }, []);

  const sortedTreatment = treatmentBank?.map((treatment) => ({
    label: treatment?.name,
    value: treatment?.name,
  }));

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
      treatment: [
        {
          name: "",
          detail: "",
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

  const status = [
    { label: "All Status", value: "all" },
    { label: "Successfull", value: "1" },
    { label: "Pending", value: "0" },
  ];

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
        status: checked ? 1 : 0,
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
        treatments:
          data.treatment[0].name || data.treatment[0].detail
            ? data.treatment
            : [],
      };
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
        const copyArr = [...filterAppointment]
        copyArr.push(response?.data.data.appointments[0])
        setFilterAppointment(copyArr)
        reset({});
      } else {
        toast.error(`Failed ${response?.data?.status}`);
      }
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
      setChecked(false)
      setOpenModal(false);
      setTreatments([
        {
          id: 1,
          name: "",
          detail: "",
        }
      ])
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
          treatments:
          data.treatment[0].name || data.treatment[0].detail
            ? data.treatment
            : [],
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
        const copyArr = [...filterAppointment]
        copyArr.push(response?.data.data.appointments[0])
        setFilterAppointment(copyArr)
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
      setNewPatientCheck(false)
      setTreatments([
        {
          id: 1,
          name: "",
          detail: "",
        }
      ])
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
    <div className="flex flex-col md:flex-row gap-2 mt-ratio2">
      <SearchInput placeholder={"Search"} className="flex-3" />
      <Select
        options={status}
        className="!h-[40px] placeholder:!text-gray w-full flex-1"
        value={selectedStatus}
        onChange={(value) => {
          setSelectedStatus(value);
        }}
      />
      <DateInput visitDate={visitDate} setVisitDate={setVisitDate} />
      {user?.type == 4 && (
        <AddButton onClick={() => setOpenModal(true)}>
          <Plus size={16} className="" />
          Add New Appointment
        </AddButton>
      )}
      {openModal && (
        <FormModal
          open={openModal}
          setOpen={setOpenModal}
          title={"Add New Appointment"}
          confirmButton="Confirm"
          formFields={appointmentFields}
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
          treatmentBank={sortedTreatment}
          loader={loader}
          handleReset={handleReset}
          checked={checked}
          setChecked={setChecked}
        />
      )}
    </div>
  );
};

export default SearchBarAppointment;
