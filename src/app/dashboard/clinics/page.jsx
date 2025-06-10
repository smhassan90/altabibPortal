"use client";
import SearchBarAppointment from "@/components/Search/SearchBarAppointment";
import DataTable from "@/components/Tables/DataTable";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import {
  AppoitmentColumns,
  clinicColumns,
} from "@/utils/tableData/TableColumns";
import { appointmentData } from "@/utils/tableData/TableData";
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { AxiosError } from "@/utils/axiosError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkUpSchema } from "@/utils/schema";
import SearchBarClinic from "@/components/Search/SearchBarClinic";
const page = () => {
  const { user, clinics, setClinics, setAppointment, doctors, TOKEN } = useContext(AppContext);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);
  const [visitDate, setVisitDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [loader, setLoader] = useState(false);
  const [mode, setMode] = useState("");
  const [filterClinic, setFilterClinic] = useState(clinics);
  const fetchClinicDropdown = async () => {
    try {
      setClinics([])
      setLoader(true);
      const { url, method, transformer = (data) => data } = summary.getClinics;
      const response = await Axios({
        url,
        method,
        params: {
          token: TOKEN,
        },
      });
      const transformed = transformer(response.data.data);
      setClinics(transformed);
    } catch (error) {
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchClinicDropdown();
  }, []);
  const handleExpand = (id, Selectmode) => {
    if (expandedRow === id) {
      if (mode !== Selectmode) {
        setMode(Selectmode);
      }
    } else {
      setExpandedRow(id);
      setMode(Selectmode);
    }
  };
  useEffect(() => {
    // console.log(selectedStatus, "selectedStatus");
    // const filterData = appointment.filter((item) => {
    //   if (selectedStatus == "all") return item;
    //   if (item.status == selectedStatus) return item;
    // });
    // console.log(filterData, "filterData");
    setFilterClinic(clinics);
  }, [clinics]);
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
      <h2>Clinic Management</h2>
      <SearchBarClinic
      // // visitDate={visitDate}
      // setVisitDate={setVisitDate}
      // selectedStatus={selectedStatus}
      // setSelectedStatus={setSelectedStatus}
      />
      <DynamicTable
        data={filterClinic}
        columns={clinicColumns(handleExpand, expandedRow)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
        control={control}
        register={register}
        errors={errors}
        loader={loader}
        mode={mode}
      />
    </div>
  );
};

export default page;
