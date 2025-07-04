"use client";
import SearchBarAppointment from "@/components/Search/SearchBarAppointment";
import DataTable from "@/components/Tables/DataTable";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AppoitmentColumns } from "@/utils/tableData/TableColumns";
import { appointmentData } from "@/utils/tableData/TableData";
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { AxiosError } from "@/utils/axiosError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkUpSchema } from "@/utils/schema";
import { useSearchParams } from 'next/navigation';
const page = () => {
  const searchParams = useSearchParams();
  const { user, appointment, setAppointment, doctors, fetchDoctorDropdown } = useContext(AppContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);
  const [visitDate, setVisitDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [loader, setLoader] = useState(false);
  const [mode, setMode] = useState("");
  const [filterAppointment, setFilterAppointment] = useState(appointment);
  const clinicId = searchParams.get('clinicId');
  const doctorId = searchParams.get('doctorId');
  const handleExpand = (id, Selectmode) => {
    if (expandedRow === id) {
      if (mode !== Selectmode) {
        setMode(Selectmode);
      }
      else {
        setExpandedRow(null);
        setMode("");
      }
    } else {
      setExpandedRow(id);
      setMode(Selectmode);
    }
  };
  const fetchAppointment = async () => {
    try {
      setAppointment([]);
      setLoader(true);
      const response = await Axios({
        ...summary.viewAppointment,
        params: {
          token: user?.token,
          visitDate: visitDate,
          clinicId: user.type == 5 ? 0 : clinicId ? clinicId : user?.username,
          doctorId: user.type == 3 ? doctorId : 0,
          patientId: 0,
          appointmentId: 0,
          followupDate: "",
        },
      });
      if (response.data.status === "200") {
        setAppointment(response.data.data.appointments);
      }
    } catch (error) {
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [visitDate]);
  
  useEffect(() => {
    const filterData = appointment.filter((item) => {
      if (selectedStatus == "all") return item;
      if (item.status == selectedStatus) return item;
    });
    setFilterAppointment(filterData);
  }, [selectedStatus, appointment]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkUpSchema),
    defaultValues: {
      bloodPressure: "",
      weight: "",
      charges: "",
      prescription: "",
      diagnosis: "",
      followupDate: "",
    },
  });
  return (
    <div className="mt-ratio2">
      <h2>Appointment Management</h2>
      <SearchBarAppointment
        visitDate={visitDate}
        setVisitDate={setVisitDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        filterAppointment={filterAppointment}
        setFilterAppointment={setFilterAppointment}
      />
      <DynamicTable
        data={filterAppointment}
        columns={AppoitmentColumns(handleExpand, expandedRow, user)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
        fetchAppointment={fetchAppointment}
        control={control}
        register={register}
        errors={errors}
        loader={loader}
        mode={mode}
        tableName="Appointment"
      />
    </div>
  );
};

export default page;
