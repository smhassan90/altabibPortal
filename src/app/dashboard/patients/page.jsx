"use client";
import DeleteConformation from "@/components/DeleteConformation";
import SearchBarPatient from "@/components/Search/SearchBarPatient";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import { checkUpSchema } from "@/utils/schema";
import { patientColumns } from "@/utils/tableData/TableColumns";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const page = () => {
  const { user, TOKEN } = useContext(AppContext);
  const [expandedRow, setExpandedRow] = useState(null);
  const [loader, setLoader] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [selectedClinic, setSelectedClinic] = useState();
  const [patient, setPatient] = useState([]);
  const [filterPatient, setFilterPatient] = useState([]);
  const [searchPatient, setSearchPatient] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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
        setPatient([]);
        setLoader(true);
        const response = await Axios({
          ...summary.getAllPatients,
          params: {
            token: TOKEN,
            clinicId:
              user?.type == 5
                ? selectedClinic
                  ? selectedClinic
                  : 0
                : user?.username,
            doctorId: selectedDoctor ? selectedDoctor : 0,
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
  }, [selectedDoctor, selectedClinic]);

  useEffect(() => {
    const filtered = patient.filter((item, index) =>
      item.name.toLowerCase().includes(searchPatient.toLowerCase())
    );
    setFilterPatient(filtered);
  }, [patient, searchPatient]);

  const deletePatient = (id) => {
    setDeleteModalVisible(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    // try {
    //   setLoader(true);
    //   const response = await Axios({
    //     ...summary.deleteQualification,
    //     params: {
    //       token: TOKEN,
    //       qualificationId: deleteId,
    //     },
    //   });
    //   if (response.data.status == 200) {
    //     toast.success("Qualification Delete Successfully");
    //     setDeleteModalVisible(false);
    //     setQualification((prev) => {
    //       return prev.filter((qual) => qual.id !== deleteId);
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   AxiosError(error);
    // } finally {
    //   setLoader(false);
    // }
  };

  return (
    <>
      <div className="mt-ratio2">
        <h2>Patient Management</h2>
        <SearchBarPatient
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          selectedClinic={selectedClinic}
          setSelectedClinic={setSelectedClinic}
          searchPatient={searchPatient}
          setSearchPatient={setSearchPatient}
        />
        <DynamicTable
          data={filterPatient}
          columns={patientColumns(handleExpand, expandedRow, deletePatient)}
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
      {deleteModalVisible && (
        <DeleteConformation
          deleteModalVisible={deleteModalVisible}
          setDeleteModalVisible={setDeleteModalVisible}
          confirmDelete={confirmDelete}
        />
      )}
    </>
  );
};

export default page;
