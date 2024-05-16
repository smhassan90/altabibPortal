// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar7 from "assets/img/avatars/avatar7.png";
import avatar8 from "assets/img/avatars/avatar8.png";
import avatar9 from "assets/img/avatars/avatar9.png";
import avatar10 from "assets/img/avatars/avatar10.png";

//avatars

const dp1 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMq47UqcDU9G8SbR9WzZUhRzXNWRIp-qCKsyL7bM-N6g&s";
const dp2 =
  "https://citilab.org.pk/wp-content/uploads/2018/05/furqan-e1597046240349.png";
const dp3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpUms_cxGowy5470OlkGIbsAC08aR2cNoMh-HrGNwlkA&s";
const dp4 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS36lNGwmClfWGZgHJr75JSdYBFjKIJ_qvB-OHFWzwaYQ&s";
const dp5 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2jP0PF5oW6bpV29ArHF1X6lYG4di65w0Apa91I9EtJA&s";
const dp6 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5IJEHuHuY9OIw9bxPPZkK4MIPj8rSd5xAL6yjPQnhjQ&s";
const dp7 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHT8xKcP5bHgGkREJO-paS7TmToXVXfVKGIwOIv0TygQ&s";

// Custom icons
import {
  AdobexdLogo,
  AtlassianLogo,
  InvisionLogo,
  JiraLogo,
  SlackLogo,
  SpotifyLogo,
} from "components/Icons/Icons.js";
import { AiOutlineExclamation } from "react-icons/ai";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";
import { SiDropbox } from "react-icons/si";
import { token } from "stylis";

export const dashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "Argon Dashboard Chakra Version",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    members: [avatar10, avatar4],
    budget: "Not set",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "Redesign New Online Shop",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const timelineData = [
  {
    logo: FaBell,
    title: "$2400, Design changes",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
  {
    logo: FaHtml5,
    title: "New order #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "Server Payments for April",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "New card added for order #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "Unlock packages for Development",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "New order #9851258",
    date: "18 DEC 4:41 PM",
  },
];
export const rtlDashboardTableData = [
  {
    logo: AdobexdLogo,
    name: "نسخة Argon Dashboard Chakra",
    members: [avatar1, avatar2, avatar3, avatar4, avatar5],
    budget: "$14,000",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "إضافة مسار التقدم",
    members: [avatar3, avatar2],
    budget: "$3,000",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "إصلاح أخطاء النظام الأساسي",
    members: [avatar10, avatar4],
    budget: "غير مضبوط",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "إطلاق تطبيق الهاتف المحمول الخاص بنا",
    members: [avatar2, avatar3, avatar7, avatar8],
    budget: "$32,000",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "أضف صفحة التسعير الجديدة",
    members: [avatar10, avatar3, avatar7, avatar2, avatar8],
    budget: "$400",
    progression: 25,
  },
  {
    logo: InvisionLogo,
    name: "إعادة تصميم متجر جديد على الإنترنت",
    members: [avatar9, avatar3, avatar2],
    budget: "$7,600",
    progression: 40,
  },
];

export const rtlTimelineData = [
  {
    logo: FaBell,
    title: "$2400, تغييرات في التصميم",
    date: "22 DEC 7:20 PM",
    color: "teal.300",
  },
  {
    logo: FaHtml5,
    title: "طلب جديد #4219423",
    date: "21 DEC 11:21 PM",
    color: "orange",
  },
  {
    logo: FaShoppingCart,
    title: "مدفوعات الخادم لشهر أبريل",
    date: "21 DEC 9:28 PM",
    color: "blue.400",
  },
  {
    logo: FaCreditCard,
    title: "تمت إضافة بطاقة جديدة للطلب #3210145",
    date: "20 DEC 3:52 PM",
    color: "orange.300",
  },
  {
    logo: SiDropbox,
    title: "فتح الحزم من أجل التنمية",
    date: "19 DEC 11:35 PM",
    color: "purple",
  },
  {
    logo: AdobexdLogo,
    title: "طلب جديد #9851258",
    date: "18 DEC 4:41 PM",
  },
];

export const tablesTableData = [
  {
    avatar: dp1,
    name: "Furqan Mangrio",
    userName: "furqan_ahmed.mangrio",
    specialization: "Dentist",
    qualification: ["FCPS", "BDS", "DDS"],
    earning: "0",
    pending: "18",
    success: "0",
  },
  {
    avatar: dp2,
    name: "Syed Faheem Ahmed",
    userName: "sfaheem5",
    specialization: "Cardiologist",
    qualification: ["FCPS", "DM Cardiology"],
    earning: "450",
    pending: "4",
    success: "7",
  },
  {
    avatar: dp3,
    name: "Ayesha Khalid",
    userName: "Ayesha90Khalid",
    specialization: "Gastroenterologist",
    qualification: ["DM Gastroenterology"],
    earning: "650",
    pending: "6",
    success: "12",
  },
  {
    avatar: dp4,
    name: "Umme Qulsoom",
    userName: "Qulsoom_123",
    specialization: "Dentist",
    qualification: ["DM Dentistry"],
    earning: "1100",
    pending: "1",
    success: "14",
  },
];

export const patientData = [
  {
    patientName: "Ali",
    token: "01",
    age: "25",
    drName: "Dr. Furqan Mangrio",
    followUp: "2/5/2024",
    status: "Completed",
    fees: "500",
  },
  {
    patientName: "Ahmed",
    token: "02",
    age: "37",
    drName: "Dr. Faheem Ahmed",
    followUp: "2/5/2024",
    status: "Completed",
    fees: "700",
  },
  {
    patientName: "Fatima",
    token: "03",
    age: "12",
    drName: "Dr. Umme Qulsoom",
    followUp: "2/5/2024",
    status: "Pending",
    fees: "500",
  },
];

export const tablesProjectData = [
  {
    logo: AdobexdLogo,
    name: "Chakra UI Version",
    budget: "$14,000",
    status: "Working",
    progression: 60,
  },
  {
    logo: AtlassianLogo,
    name: "Add Progress Track",
    budget: "$3,000",
    status: "Canceled",
    progression: 10,
  },
  {
    logo: SlackLogo,
    name: "Fix Platform Errors",
    budget: "Not set",
    status: "Done",
    progression: 100,
  },
  {
    logo: SpotifyLogo,
    name: "Launch our Mobile App",
    budget: "$32,000",
    status: "Done",
    progression: 100,
  },
  {
    logo: JiraLogo,
    name: "Add the New Pricing Page",
    budget: "$400",
    status: "Working",
    progression: 25,
  },
];

export const invoicesData = [
  {
    date: "March, 01, 2020",
    code: "#MS-415646",
    price: "$180",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "February, 10, 2020",
    code: "#RV-126749",
    price: "$250",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "April, 05, 2020",
    code: "#FB-212562",
    price: "$560",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "June, 25, 2019",
    code: "#QW-103578",
    price: "$120",
    logo: FaFilePdf,
    format: "PDF",
  },
  {
    date: "March, 01, 2019",
    code: "#AR-803481",
    price: "$300",
    logo: FaFilePdf,
    format: "PDF",
  },
];

export const billingData = [
  {
    name: "Oliver Liam",
    company: "Viking Burrito",
    email: "oliver@burrito.com",
    number: "FRB1235476",
  },
  {
    name: "Lucas Harper",
    company: "Stone Tech Zone",
    email: "lucas@stone-tech.com",
    number: "FRB1235476",
  },
  {
    name: "Ethan James",
    company: "Fiber Notion",
    email: "ethan@fiber.com",
    number: "FRB1235476",
  },
];

export const newestTransactions = [
  {
    name: "Netflix",
    date: "27 March 2022, at 12:30 PM",
    price: "- $2,500",
    logo: FaArrowDown,
  },
  {
    name: "Apple",
    date: "27 March 2022, at 12:30 PM",
    price: "+ $2,500",
    logo: FaArrowUp,
  },
];

export const olderTransactions = [
  {
    name: "Stripe",
    date: "26 March 2022, at 13:45 PM",
    price: "+ $800",
    logo: FaArrowUp,
  },
  {
    name: "HubSpot",
    date: "26 March 2022, at 12:30 PM",
    price: "+ $1,700",
    logo: FaArrowUp,
  },
  {
    name: "Webflow",
    date: "26 March 2022, at 05:00 PM",
    price: "Pending",
    logo: AiOutlineExclamation,
  },
  {
    name: "Microsoft",
    date: "25 March 2022, at 16:30 PM",
    price: "- $987",
    logo: FaArrowDown,
  },
];

export const pageVisits = [
  {
    pageName: "/argon/",
    visitors: "4,569",
    uniqueUsers: 340,
    bounceRate: "46,53%",
  },
  {
    pageName: "/argon/index.html",
    visitors: "3,985",
    uniqueUsers: 319,
    bounceRate: "46,53%",
  },
  {
    pageName: "/argon/charts.html",
    visitors: "3,513",
    uniqueUsers: 294,
    bounceRate: "36,49%",
  },
  {
    pageName: "/argon/tables.html",
    visitors: "2,050",
    uniqueUsers: 147,
    bounceRate: "50,87%",
  },
  {
    pageName: "/argon/profile.html",
    visitors: "1,795",
    uniqueUsers: 190,
    bounceRate: "46,53%",
  },
];

export const socialTraffic = [
  {
    referral: "Facebook",
    visitors: "1,480",
    percentage: 60,
    color: "orange",
  },
  {
    referral: "Facebook",
    visitors: "5,480",
    percentage: 70,
    color: "orange",
  },
  {
    referral: "Google",
    visitors: "4,807",
    percentage: 80,
    color: "cyan",
  },
  {
    referral: "Instagram",
    visitors: "3,678",
    percentage: 75,
    color: "cyan",
  },
  {
    referral: "Twitter",
    visitors: "2,645",
    percentage: 30,
    color: "orange",
  },
];

export const patientDummy = [
  {
    name: "Ali Khan",
    address: "123 Main St",
    age: 35,
    gender: "Male",
    cellNumber: "555-1234",
    numberOfAppointments: 2,
  },
  {
    name: "Zainab Ahmed",
    address: "606 Cherry St",
    age: 30,
    gender: "Female",
    cellNumber: "555-6677",
    numberOfAppointments: 2,
  },
  {
    name: "Usman Khan",
    address: "707 Spruce St",
    age: 48,
    gender: "Male",
    cellNumber: "555-7788",
    numberOfAppointments: 5,
  },
];
// export const clinicDoctorPatients = [
//   {
//     id: number,
//     name: string,
//     patients: [
//       {
//         id: number,
//         name: string,
//         dob: string,
//         gender: string,
//         cellNumber: string,
//         appointments: [
//           // SELECT columns from t_appointments WHERE DOCTOR_ID = ... AND PATIENT_ID = ...
//           {
//             id: number,
//             token: number,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: string,
//             bloodPressure: string,
//             weight: number,
//           },
//           {
//             id: number,
//             token: number,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: number,
//             bloodPressure: string,
//             weight: number,
//           },
//         ],
//       },
//       {
//         id: number,
//         name: string,
//         dob: string,
//         gender: string,
//         cellNumber: string,
//         appointments: [
//           // SELECT columns from t_appointments WHERE DOCTOR_ID = ... AND PATIENT_ID = ...
//           {
//             id: number,
//             token: number,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: number,
//             bloodPressure: string,
//             weight: number,
//           },
//           {
//             id: number,
//             token: number,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: number,
//             bloodPressure: string,
//             weight: number,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: number,
//     name: string,
//     patients: [
//       {
//         name: string,
//         dob: string,
//         gender: string,
//         cellNumber: string,
//         appointments: [
//           // SELECT columns from t_appointments WHERE DOCTOR_ID = ... AND PATIENT_ID = ...
//           {
//             id: number,
//             token: number,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: number,
//             bloodPressure: string,
//             weight: number,
//           },
//           {
//             id: number,
//             token: number,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: number,
//             bloodPressure: string,
//             weight: number,
//           },
//         ],
//       },
//       {
//         name: string,
//         dob: string,
//         gender: string,
//         cellNumber: string,
//         appointments: [
//           // SELECT columns from t_appointments WHERE DOCTOR_ID = ... AND PATIENT_ID = ...
//           {
//             id: 1,
//             token: 1,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: 500,
//             bloodPressure: string,
//             weight: 70,
//           },
//           {
//             id: 2,
//             token: 1,
//             visitDate: string,
//             followUpDate: string,
//             diagnosis: string,
//             prescription: string,
//             charges: 500,
//             bloodPressure: string,
//             weight: 70,
//           },
//         ],
//       },
//     ],
//   },
// ];
