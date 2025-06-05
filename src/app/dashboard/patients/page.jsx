"use client";
import SearchBarPatient from "@/components/Search/SearchBarPatient";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import { checkUpSchema } from "@/utils/schema";
import { patientColumns} from "@/utils/tableData/TableColumns";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { user, TOKEN } = useContext(AppContext);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loader, setLoader] = useState(false);
  const [patient, setPatient] = useState([]);
  const [filterPatient, setFilterPatient] = useState(patient);

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
    const fetchPatients = async () => {
      try {
        setLoader(true);
        const response = await Axios({
          ...summary.getAllPatients,
          params: {
            token: TOKEN,
            clinicId: user?.username,
            doctorId:0,
          },
        });
        setPatient(response.data.data);
      } catch (error) {
        AxiosError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    setFilterPatient(patient);
  }, [patient]);
  
  return (
    <div className="mt-ratio2">
      <h2>Patient Management</h2>
      <SearchBarPatient />
      <DynamicTable
        data={filterPatient}
        columns={patientColumns(handleExpand, expandedRow)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
        filterPatient={patient}
        control={control}
        register={register}
        errors={errors}
        loader={loader}
      />
    </div>
  );
};

export default page;
