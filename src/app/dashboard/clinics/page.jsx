"use client";
import SearchBarPatient from "@/components/Search/SearchBarPatient";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import { checkUpSchema } from "@/utils/schema";
import { clinicColumns, patientColumns } from "@/utils/tableData/TableColumns";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { user, TOKEN } = useContext(AppContext);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loader, setLoader] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [clinics, setClinics] = useState([]);
  // const [filterPatient, setFilterPatient] = useState(patient);

  console.log(selectedDoctor, "selectedDoctor");

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
    const fetchClinicDropdown = async () => {
      try {
        setLoader(true);
        const response = await Axios({
          ...summary.getClinics,
          params: {
            token: TOKEN,
          },
        });
        setClinics(response.data.data.clinics);
      } catch (error) {
        AxiosError(error);
      } finally {
        setLoader(false);
      }
    }
    fetchClinicDropdown();
  }, [selectedDoctor]);

  // useEffect(() => {
  //   setFilterPatient(patient);
  // }, [patient]);

  return (
    <div className="mt-ratio2">
      <h2>Clinic Management</h2>
      {/* <SearchBarClinic selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor}/> */}
      <DynamicTable
        data={clinics}
        columns={clinicColumns(handleExpand, expandedRow)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
        // filterPatient={patient}
        control={control}
        register={register}
        errors={errors}
        loader={loader}
      />
    </div>
  );
};

export default page;
