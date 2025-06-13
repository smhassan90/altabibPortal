import React, { useContext, useEffect, useState } from "react";
import { Axios, summary } from "@/config/summaryAPI";
import { AppContext } from "@/provider/AppProvider";
import { AxiosError } from "@/utils/axiosError";
import Spinner from "@/components/Spinner/Spinner";
import ClinicInformation from "./ClinicInformation";

const ClinicExpandRow = ({ data, mode, setExpandedRow }) => {
  const [loader, setLoader] = useState(false);
  const { TOKEN } = useContext(AppContext);
  return (
    <>
      {(mode == "editable" || mode == "readable") && <div className="mx-ratio2 px-ratio2 py-ratio2 bg-Bluish text-small text-gray-700">
        <ClinicInformation data={data} mode={mode} setExpandedRow={setExpandedRow}/>
      </div>}
    </>
  );
};

export default ClinicExpandRow;
