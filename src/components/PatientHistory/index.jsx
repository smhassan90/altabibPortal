"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import AccordianButton from "@/utils/buttons/AccordianButton";

const PatientHistory = () => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const patientRecords = [
    {
      date: "May 03, 25",
      bloodPressure: "Not Found",
      weight: "Not Found",
      treatmentName: "Laboratory Test",
      prescription: "Not Found",
      diagnosis: "Not Found",
      followupDate: "Not Found",
      tokenNumber: "1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      date: "Apr 10, 25",
      bloodPressure: "120/80",
      weight: "68 kg",
      treatmentName: "Regular Checkup",
      prescription: "Vitamin D",
      diagnosis: "Vitamin D Deficiency",
      followupDate: "May 10, 25",
      tokenNumber: "2",
      description:
        "Patient reported fatigue. Blood tests revealed vitamin D deficiency. Prescribed supplements and recommended more sun exposure.",
    },
    {
      date: "Mar 01, 25",
      bloodPressure: "118/78",
      weight: "67 kg",
      treatmentName: "Initial Consultation",
      prescription: "None",
      diagnosis: "Healthy",
      followupDate: "Apr 01, 25",
      tokenNumber: "3",
      description:
        "Initial consultation. Patient is in good health. Recommended regular exercise and balanced diet.",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  return (
    <div className="mx-ratio2 px-ratio2 py-ratio2 bg-background text-small text-gray-700">
      <h2 className="text-text text-medium 2xl:text-large font-semibold">
        Patient History
      </h2>
      <div className="space-y-2 mt-ratio2">
        {patientRecords.map((record, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <AccordianButton onClick={() => toggleAccordion(index)}>
              <span className="font-medium text-gray-700">{record.date}</span>
              <ChevronDown
                size={16}
                className={`text-gray transition-transform duration-200 ${
                  openAccordion === index ? "transform rotate-180" : ""
                }`}
              />
            </AccordianButton>
            <div
              className={`bg-white transition-all duration-300 ease-in-out overflow-hidden ${
                openAccordion === index
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-ratio1 py-ratio2">
                <div className="flex items-center">
                  <p className="text-small 2xl:text-medium text-gray">Blood Pressure:</p>
                  <p className="font-medium">{record.bloodPressure}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientHistory;
