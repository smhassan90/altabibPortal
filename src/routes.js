// import
import React from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
} from "components/Icons/Icons";
import bookAppointment from "views/Dashboard/bookAppointment";
import Patients from "views/Dashboard/Patients";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/bookAppointment",
    name: "Book Appointment",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: bookAppointment,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Report",
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/Patients",
    name: "Patients",
    rtlName: "آرتيإل",
    icon: <HomeIcon color="inherit" />,
    component: Patients,
    layout: "/admin",
  },
  {
    //name: "",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign Out",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
