import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  ClockFading,
  Delete,
  Eye,
  Pencil,
} from "lucide-react";
import CustomButom from "../buttons/AddButton";
import AddButton from "../buttons/AddButton";
import PendingButton from "../buttons/PendingButton";
import EditButton from "../buttons/EditButton";
import ShowMoreButton from "../buttons/ShowMoreButton";

export const AppoitmentColumns = (onExpand, expandedRowId) => [
  {
    key: "id",
    label: "ID",
    render: (value, row) => (
      <div className="flex items-center justify-between">
        <span>{value}</span>
        <button
          onClick={() => onExpand(row.id, "readable")}
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
  { key: "patientName", label: "Patient" },
  { key: "age", label: "Age", sortable: true },
  {
    key: "visitDate",
    label: "Visit Date",
    render: (value) => (
      <div className="flex items-center gap-2">
        <CalendarDays size={16} />
        <span className={`text-small 2xl:text-medium`}>{value}</span>
      </div>
    ),
  },
  { key: "clinicName", label: "Clinic" },
  { key: "doctorName", label: "Doctor" },
  {
    key: "status",
    label: "App.Status",
    render: (value) => {
      if (value == 1) {
        return (
          <AddButton>
            <CircleCheck size={16} />
            Successfull
          </AddButton>
        );
      } else if (value == 0) {
        return (
          <PendingButton>
            <ClockFading size={16} />
            Pending
          </PendingButton>
        );
      } else {
        <h1>Cancel</h1>;
      }
    },
  },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex space-x-2">
        {row?.status == 0 ? (
          <div className="flex items-center space-x-2">
            {/* <EditButton className={"!px-2 !py-2"} onClick={() => onExpand(row.id)}> */}
            <Eye
              size={20}
              className="text-secondary"
              onClick={() => onExpand(row.id, "readable")}
            />
            <Pencil
              size={20}
              className="text-Tertiary"
              onClick={() => onExpand(row.id, "editable")}
            />
            {/* </EditButton> */}
            {/* <ShowMoreButton className={"!px-2 !py-2"}>
              <Eye size={20} />
            </ShowMoreButton> */}
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Eye
              size={20}
              className="text-secondary"
              onClick={() => onExpand(row.id, "readable")}
            />
          </div>
        )}
      </div>
    ),
  },
];

export const doctorColumns = (onExpand, expandedRowId) => [
  {
    key: "id",
    label: "ID",
    render: (value, row) => (
      <div className="flex items-center justify-between">
        <span>{value}</span>
        <button
          onClick={() => onExpand(row.id, "readable")}
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
  { key: "doctorName", label: "Doctor" },
  { key: "gender", label: "Gender", sortable: true },
  { key: "age", label: "Age", sortable: true },
  // { key: "spaecialization", label: "Clinic" },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex items-center space-x-2">
        <Eye
          size={20}
          className="text-secondary"
          onClick={() => onExpand(row.id, "readable")}
        />
        <Pencil
          size={20}
          className="text-Tertiary"
          onClick={() => onExpand(row.id, "editable")}
        />
        <Delete size={20} className="text-red-500" />
      </div>
    ),
  },
];

export const patientColumns = (onExpand, expandedRowId) => [
  {
    key: "id",
    label: "ID",
    render: (value, row) => (
      <div className="flex items-center justify-between">
        <span>{value}</span>
      </div>
    ),
  },
  { key: "name", label: "Patient" },
  { key: "gender", label: "Gender", sortable: true,
    render: (value) => (
      <div className="flex items-center justify-between capitalize">
        <span>{value}</span>
      </div>
    ),
   },
  { key: "cellNumber", label: "Cell Number" },
  { key: "dob", label: "DOB" },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex items-center space-x-2">
        <Eye
          size={20}
          className="text-secondary"
          onClick={() => onExpand(row.id, "readable")}
        />
        <Pencil
          size={20}
          className="text-Tertiary"
          onClick={() => onExpand(row.id, "editable")}
        />
        <Delete size={20} className="text-red-500" />
      </div>
    ),
  },
];
