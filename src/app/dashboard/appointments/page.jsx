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
const page = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [visitDate, setVisitDate] = useState(dayjs().format("YYYY-MM-DD"));
  console.log(visitDate, "visitDate");
  const handleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  const { user, appointment, setAppointment } = useContext(AppContext);
  console.log(user, "User");
  const fetchAppointment = async () => {
    try {
      const response = await Axios({
        ...summary.viewAppointment,
        params: {
          token: user?.token,
          visitDate: visitDate,
          clinicId: user?.username,
          doctorId: 0,
          patientId: 0,
          appointmentId: 0,
          followupDate: "",
        },
      });
      if (response.data.status === "200") {
        setAppointment(response.data.data);
      }
      setAppointment(resp);
    } catch (error) {
      console.log(error, "error");
      AxiosError(error);
    }
  };
  useEffect(() => {
    fetchAppointment();
  }, [visitDate]);
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
      <SearchBarAppointment visitDate={visitDate} setVisitDate={setVisitDate} />
      <DynamicTable
        data={appointmentData}
        columns={AppoitmentColumns(handleExpand, expandedRow)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
        control={control}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default page;
