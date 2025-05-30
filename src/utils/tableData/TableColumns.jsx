import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  ClockFading,
  Pencil,
} from "lucide-react";
import CustomButom from "../buttons/AddButton";
import AddButton from "../buttons/AddButton";
import PendingButton from "../buttons/PendingButton";

export const AppoitmentColumns = (onExpand, expandedRowId) => [
  {
    key: "id",
    label: "ID",
    render: (value, row) => (
      <div className="flex items-center justify-between">
        <span>{value}</span>
        <button
          onClick={() => onExpand(row.id)}
          className="ml-2 text-primary hover:text-blue-600"
        >
          {expandedRowId === row.id ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronUp size={16} />
          )}
        </button>
      </div>
    ),
  },
  { key: "patient", label: "Patient" },
  { key: "age", label: "Age", sortable: true },
  {
    key: "visitDate",
    label: "Visit Date",
    render: (value) => (
      <div className="flex items-center gap-2">
        <CalendarDays size={16} />
        <span className={`text-small`}>{value}</span>
      </div>
    ),
  },
  { key: "clinic", label: "Clinic" },
  { key: "doctor", label: "Doctor" },
  {
    key: "status",
    label: "App.Status",
    render: (value) => {
      if (value == "Successfull") {
        return (
          <AddButton>
            <CircleCheck size={16} />
            Successfull
          </AddButton>
        );
      } else if (value == "Pending") {
        return (
          <PendingButton>
            <ClockFading size={16} />
            Pending
          </PendingButton>
        );
      } else {
        <h1>Osaam</h1>;
      }
    },
  },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex space-x-2">
        {row?.status !== "Successfull" ? (
          <>
            <button className="">
              <Pencil size={16} className="text-Tertiary" />
            </button>
            {/* <button className="">
              <Eye size={16} className="text-Tertiary" />
            </button> */}
          </>
        ) : null}
      </div>
    ),
  },
];
