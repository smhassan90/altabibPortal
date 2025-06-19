import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  ClockFading,
  Delete,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import CustomButom from "../buttons/AddButton";
import AddButton from "../buttons/AddButton";
import PendingButton from "../buttons/PendingButton";
import EditButton from "../buttons/EditButton";
import ShowMoreButton from "../buttons/ShowMoreButton";
import { Tag } from "antd";
import { useContext } from "react";
import { AppContext } from "@/provider/AppProvider";

export const AppoitmentColumns = (onExpand, expandedRowId, user) => [
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
  { 
    key: "patientName", 
    label: "Patient" 
  },
  { 
    key: "age",
    label: "Age", 
    sortable: true 
  },
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
  { 
    key: "clinicName", 
    label: "Clinic" 
  },
  { 
    key: "doctorName",
    label: "Doctor" 
  },
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
            {/* {user.type == 3 || user.type == 4 && <Pencil */}
            {<Pencil
              size={20}
              className="text-Tertiary"
              onClick={() => onExpand(row.id, "editable")}
            />}
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

export const clinicColumns = (onExpand, expandedRowId, deleteData) => [
  {
    key: "id",
    label: "ID",
  },
  { 
    key: "name", 
    label: "Clinic Name" 
  },
  { 
    key: "address",
    label: "Address" 
  },
  {
    key: "LatLong",
    label: "Latitude",
    render: (value, row) => <div>{value.split(",")[0]}</div>,
  },
  {
    key: "LatLong",
    label: "Longitude",
    render: (value, row) => <div>{value.split(",")[1]}</div>,
  },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex space-x-2">
        <div className="flex items-center space-x-2">
          <Pencil
            size={20}
            className="text-Tertiary"
            onClick={() => onExpand(row.id, "editable")}
          />
          <Trash2 
            size={20}
            className="text-red-500"
            onClick={() => deleteData(row.id)}
          />
        </div>
      </div>
    ),
  },
];

export const doctorColumns = (onExpand, expandedRowId, deleteData, user) => [
  {
    key: "id",
    label: "ID",
    render: (value, row) => (
      <div className="flex items-center gap-ratio2">
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
  { 
    key: "name",
    label: "Doctor" 
  },
  { 
    key: "gender", 
    label: "Gender", 
    sortable: true,
    render: (value) => (
      <div className="flex items-center justify-between capitalize">
        <span>{value}</span>
      </div>
    ),
  },
  { 
    key: "age", 
    label: "Age", 
    sortable: true 
  },
  {
    key: "specialization",
    label: "Specialization",
    render: (specialization) => {
      if (!specialization || !Array.isArray(specialization) || specialization.length === 0) {
        return "-";
      }
      const colors = ["blue", "green", "red", "orange", "purple"];
      console.log(specialization,"specialization")
      return (
        <div className="flex flex-col gap-1">
          {specialization.map((item, index) => (
            <Tag color={colors[index % colors.length]} key={index} className="w-fit">
              {item.name}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    key: "qualification",
    label: "Qualification",
    type: [4, 5],
    render: (qualification) => {
      if (!qualification || !Array.isArray(qualification) || qualification.length === 0) {
        return "-";
      }
      const colors = ["blue", "green", "red", "orange", "purple"];
      return (
        <div className="flex flex-col gap-1">
          {qualification.map((item, index) => (
            <Tag color={colors[index % colors.length]} key={index} className="w-fit">
              {item.name}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex items-center justify-start space-x-2">
        <Eye
          size={20}
          className="text-secondary"
          onClick={() => onExpand(row.id, "readable")}
        />
        {user.type == 5 && <Pencil
          size={20}
          className="text-Tertiary"
          onClick={() => onExpand(row.id, "editable")}
        />}
        {user.type == 5 && <Trash2 
          size={20} 
          className="text-red-500" 
          onClick={() => deleteData(row.id)}/>}
      </div>
    ),
  },
];

export const patientColumns = (onExpand, expandedRowId, deleteData) => [
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
  {
    key: "gender",
    label: "Gender",
    sortable: true,
    render: (value) => (
      <div className="flex items-center justify-between capitalize">
        <span>{value}</span>
      </div>
    ),
  },
  { key: "cellNumber", label: "Cell Number" },
  { key: "dob", label: "DOB" },
  // {
  //   key: "actions",
  //   label: "Actions",
  //   render: (value, row) => (
  //     <div className="flex items-center space-x-2">
  //       {/* <Eye
  //         size={20}
  //         className="text-secondary"
  //         onClick={() => onExpand(row.id, "readable")}
  //       /> */}
  //       <Pencil
  //         size={20}
  //         className="text-Tertiary"
  //         onClick={() => onExpand(row.id, "editable")}
  //       />
  //       {/* <Trash2 
  //         size={20} 
  //         className="text-red-500"
  //         onClick={() => deleteData(row.id)}
  //       /> */}
  //     </div>
  //   ),
  // },
];

export const specializationColumns = (onExpand, expandedRowId, deleteData) => [
  {
    key: "id",
    label: "ID",
  },
  { 
    key: "name", 
    label: "Specialization" 
  },
  {
    key: "colorCode",
    label: "Color",
  },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex items-center space-x-2">
        {/* <Pencil
          size={20}
          className="text-Tertiary"
          onClick={() => onExpand(row.id, "editable")}
        /> */}
        <Trash2 size={20} className="text-red-500" onClick={() => deleteData(row.id)}/>
      </div>
    ),
  },
];

export const qualificationColumns = (onExpand, expandedRowId, deleteData) => [
  {
    key: "id",
    label: "ID",
  },
  { 
    key: "name", 
    label: "Qualification" 
  },
  {
    key: "colorCode",
    label: "Color",
  },
  {
    key: "actions",
    label: "Actions",
    render: (value, row) => (
      <div className="flex items-center space-x-2">
        {/* <Pencil
          size={20}
          className="text-Tertiary"
          onClick={() => onExpand(row.id, "editable")}
        /> */}
        <Trash2 size={20} className="text-red-500" onClick={() => deleteData(row.id)}/>
      </div>
    ),
  },
];
