import React, { useContext, useState } from "react";
import { AppContext } from "@/provider/AppProvider";
import SpecializationInformation from "./SpecializationInformation";

const SpecializationExpandRow = ({
  data,
  mode,
  setExpandedRow,
  functionData,
  setterFunctionData,
}) => {
  return (
    <>
      <div className="mx-ratio2 px-ratio2 py-ratio2 bg-Bluish text-small text-gray-700">
        <SpecializationInformation
          data={data}
          mode={mode}
          setExpandedRow={setExpandedRow}
          functionData={functionData}
          setterFunctionData={setterFunctionData}
        />
      </div>
    </>
  );
};

export default SpecializationExpandRow;
