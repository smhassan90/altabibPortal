"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AccordianButton from "@/utils/buttons/AccordianButton";
import {
  ReadOnlyInputWithLabel,
  ReadOnlyTextAreaWithLabel,
} from "@/components/Inputs/ReadableInputs";

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-ratio2 mt-ratio2 px-ratio2">
                  <ReadOnlyInputWithLabel
                    label={"Blood Pressure"}
                    value={record.bloodPressure}
                  />
                  <ReadOnlyInputWithLabel
                    label={"Weight"}
                    value={record.weight}
                  />
                  <ReadOnlyInputWithLabel
                    label={"FollowUp Date"}
                    value={record.followupDate}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-ratio2 mt-ratio2 pb-ratio2 border-b border-border px-ratio2">
                  <ReadOnlyTextAreaWithLabel
                    label={"Prescription"}
                    value={record.prescription}
                  />
                  <ReadOnlyTextAreaWithLabel
                    label={"Diagnosis"}
                    value={record.diagnosis}
                  />
                </div>

                <div className="py-ratio2">
                  {record?.treatments?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {record?.treatments?.map((rec, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-2 gap-ratio2"
                        >
                          <ReadOnlyInputWithLabel
                            label={"Treatment Name"}
                            value={rec?.name}
                          />
                          <ReadOnlyTextAreaWithLabel
                            label={"Treatment Description"}
                            value={rec?.detail}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-medium text-text text-center">
                      No Treatments
                    </p>
                  )}
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
