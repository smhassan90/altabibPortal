import React, { useContext, useEffect, useState } from "react";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import Spinner from "@/components/Spinner/Spinner";
import QualificationInformation from "./QualificationInformation";

const QualificationExpandRow = ({
  data,
  mode,
  setExpandedRow,
  functionData,
  setterFunctionData,
}) => {
  console.log(data, "data");
  const [loader, setLoader] = useState(false);
  const { TOKEN } = useContext(AppContext);
  return (
    <>
      <div className="mx-ratio2 px-ratio2 py-ratio2 bg-Bluish text-small text-gray-700">
        <QualificationInformation
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

export default QualificationExpandRow;
