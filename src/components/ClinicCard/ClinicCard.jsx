import React from "react";
import { useRouter } from "next/navigation";
import clinicVector from "../../assets/icons/clinicVector.svg";
import timingVector from "../../assets/icons/timingVector.svg";
import chargesVector from "../../assets/icons/chargesVector.svg";
import appointmentVector from "../../assets/icons/appointmentVector.svg";
import Image from "next/image";
const ClinicCard = ({ clinic, doctorId }) => {
  const router = useRouter();
  const handleClick = () => {
    const clinicId = clinic?.clinic?.id;
    router.push(`/dashboard/appointments?clinicId=${clinicId}&doctorId=${doctorId}`);
  };
  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-medium shadow-md p-ratio2 space-y-4 border border-border"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray text-small">
          <Image
            src={clinicVector}
            height={10}
            width={10}
            className="h-4 w-4"
            alt="Clinic Icon"
          />
          <span className="">Clinic:</span>
        </div>
        <span className="text-text text-small">{clinic?.clinic?.name}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray text-small">
          <Image
            src={timingVector}
            height={10}
            width={10}
            className="h-4 w-4"
            alt="Timing Icon"
          />
          <span className="">Timing:</span>
        </div>
        <span className="text-text text-small">{`${clinic.startTime} - ${clinic.endTime}`}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray text-small">
          <Image
            src={chargesVector}
            height={10}
            width={10}
            className="h-4 w-4"
            alt="Charges Vector"
          />
          <span className="">Charges:</span>
        </div>
        <span className="text-text text-small">{clinic.charges}/-</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray text-small">
          <Image
            src={appointmentVector}
            height={10}
            width={10}
            className="h-4 w-4"
            alt="Appointment Vector"
          />
          <span className="">No of Appointments:</span>
        </div>
        <span className=" text-white text-small bg-Tertiary p-1 px-2 rounded-sm">
          50
        </span>
      </div>
    </div>
  );
};

export default ClinicCard;
