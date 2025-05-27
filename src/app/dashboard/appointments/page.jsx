"use client";
import SearchBarAppointment from "@/components/Search/SearchBarAppointment";
import DataTable from "@/components/Tables/DataTable";
import { DynamicTable } from "@/components/Tables/DynamicTable";
import { AppoitmentColumns } from "@/utils/tableData/TableColumns";
import { appointmentData } from "@/utils/tableData/TableData";
import React, { useState } from "react";

const page = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const handleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };
  return (
    <div className="mt-ratio2">
      <h2>Appointment Management</h2>
      <SearchBarAppointment />
      <DynamicTable
        data={appointmentData}
        columns={AppoitmentColumns(handleExpand, expandedRow)}
        initialItemsPerPage={5}
        expandedRow={expandedRow}
      />
    </div>
  );
};

export default page;
