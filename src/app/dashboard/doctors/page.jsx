"use client";
import DeleteConformation from "@/components/DeleteConformation";
import SearchBarAppointment from "@/components/Search/SearchBarAppointment";
import SearchBarDoctor from "@/components/Search/SearchBarDoctor";
import DataTable from "@/components/Tables/DataTable";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import { checkUpSchema } from "@/utils/schema";
import {
  AppoitmentColumns,
  doctorColumns,
} from "@/utils/tableData/TableColumns";
import { appointmentData } from "@/utils/tableData/TableData";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [loader, setLoader] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [clinicId, setClinicId] = useState(0)
  const [mode, setMode] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const { TOKEN, user } = useContext(AppContext);

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
      else {
        setExpandedRow(null);
        setMode("");
      }
    } else {
      setExpandedRow(id);
      setMode(Selectmode);
    }
  };

  const fetchDoctor = async () => {
    try {
      setDoctors([])
      setLoader(true);
      const { url, method, transformer = (data) => data } = summary.getDoctors;
      const response = await Axios({
        url,
        method,
        params: {
          token: TOKEN,
          clinicId: user.type == 5 ? clinicId : user?.username,
        },
      });
      const transformed = transformer(response.data.data);
      setDoctors(transformed);
    } catch (error) {
      console.log(error);
      AxiosError(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchDoctor();
  }, [clinicId]);

  const deleteDoctor = (id) =>{
    setDeleteModalVisible(true)
    console.log(id)
  }

  const confirmDelete = () =>{

  }

  console.log(doctors, "doctors");
  return (
    <>
      <div className="mt-ratio2">
        <h2>Doctor Management</h2>
        <SearchBarDoctor 
          doctors={doctors} 
          setDoctors={setDoctors} 
          clinicId={clinicId} 
          setClinicId={setClinicId}
        />
        <DynamicTable
          data={doctors}
          columns={doctorColumns(handleExpand, expandedRow, deleteDoctor, user)}
          initialItemsPerPage={5}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          // fetchAppointment={fetchAppointment}
          control={control}
          register={register}
          errors={errors}
          loader={loader}
          mode={mode}
          tableName="Doctor"
        />
      </div>
      {deleteModalVisible && <DeleteConformation 
        deleteModalVisible={deleteModalVisible} 
        setDeleteModalVisible={setDeleteModalVisible}
        confirmDelete={confirmDelete}
      />}
    </>
  );
};

export default page;
