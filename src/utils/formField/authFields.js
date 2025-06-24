export const loginFields = [
  {
    label: "User Name",
    input: "Enter Your User Name",
    type: "text",
    name: "username",
  },
  {
    label: "Password",
    input: "Enter Your Password",
    type: "password",
    name: "password",
  },
  {
    label: "User type",
    input: "Select User type",
    type: "select",
    name: "userType",
    options: [
      { label: "Admin", value: "5" },
      { label: "Clinic", value: "4" },
      { label: "Doctor", value: "3" },
    ],
  },
];
