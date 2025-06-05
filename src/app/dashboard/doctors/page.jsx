"use client";
import SearchBarAppointment from "@/components/Search/SearchBarAppointment";
import SearchBarDoctor from "@/components/Search/SearchBarDoctor";
import DataTable from "@/components/Tables/DataTable";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { AppoitmentColumns, doctorColumns } from "@/utils/tableData/TableColumns";
import { appointmentData } from "@/utils/tableData/TableData";
import React, { useState } from "react";

const page = () => {
  const [expandedRow, setExpandedRow] = useState(null);
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
  return (
    <div className="mt-ratio2">
      <h2>Doctor Management</h2>
      <SearchBarDoctor />
      {/* <DynamicTable
        data={filterAppointment}
        columns={doctorColumns(handleExpand, expandedRow)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
        setExpandedRow={setExpandedRow}
        fetchAppointment={fetchAppointment}
        control={control}
        register={register}
        errors={errors}
        loader={loader}
        mode={mode}
      /> */}
    </div>
  );
};

export default page;
