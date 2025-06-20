"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AccordianButton from "@/utils/buttons/AccordianButton";

const PatientHistory = ({ patientHistory }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const title = "text-small 2xl:text-medium text-gray";
  const text = "text-small 2xl:text-medium text-text";
  console.log(patientHistory, "PatientHistory");

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <div className="mx-ratio2 px-ratio2 py-ratio2 bg-Bluish text-small text-gray-700">
      <h2 className="text-text text-medium 2xl:text-large font-semibold">
        Patient History
      </h2>

      <div className="space-y-2 mt-ratio2">
        {patientHistory?.length > 0 ? (
          patientHistory?.map((record, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md overflow-hidden transition-all duration-500"
            >
              {/* Accordion Button */}
              <AccordianButton onClick={() => toggleAccordion(index)}>
                <span className="font-medium text-gray-700">
                  {record.visitDate}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray transition-transform duration-200 ${
                    openAccordion === index ? "rotate-180 animate-bounce" : ""
                  }`}
                />
              </AccordianButton>

              {/* Accordion Content with Animation */}
              <div
                className={`bg-white overflow-hidden transition-all duration-700 ease-in-out transform ${
                  openAccordion === index
                    ? "max-h-[500px] opacity-100 translate-y-0 scale-100"
                    : "max-h-0 opacity-0 -translate-y-2 scale-95"
                }`}
              >
                {/* First Row - 3 Inputs */}
                <div className="px-ratio1 py-ratio2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">
                      Blood Pressure:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={record.bloodPressure || "Not Found"}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">
                      Weight:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={record.weight || "Not Found"}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">
                      FollowUp Date:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={record.followupDate || "Not Found"}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Second Row */}
                <div className="px-ratio1 py-ratio2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">
                      Prescription:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={record.prescription || "Not Found"}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">
                      Diagnosis:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={record.diagnosis || "Not Found"}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Third Row */}
                <div className="px-ratio1 py-ratio2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">
                      Treatment Name:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={record.bloodPressure}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-2 font-medium text-gray-700">
                      Description:
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={record.bloodPressure}
                      className="bg-gray-100 border border-gray-300 rounded px-3 py-2 focus:outline-none hover:border-orange-400 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-small 2xl:text-medium text-text text-center">
            No patient history available.
          </div>
        )}
      </div>
    </div>
  );
};
export default PatientHistory;
