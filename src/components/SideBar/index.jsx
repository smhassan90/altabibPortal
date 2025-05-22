//   "use client";
//   import React from "react";
//   import Link from "next/link";
//   import { useRouter } from "next/navigation";
//   import { Menu, X, LayoutDashboard, Wrench, Boxes, LogOut } from "lucide-react";
//   import UserDropdown from "@/components/Dropdowns/UserDropdown.js";
//   import { usePathname } from "next/navigation";
//   import { FadeInSection } from "../animation/FadeInSection";

//   export default function Sidebar() {
//     const pathname = usePathname();
//     const [collapseShow, setCollapseShow] = React.useState("hidden");
//     const router = useRouter();

//     return (
//       <>
//       <FadeInSection delay={0.2}>
//         <nav className="md:fixed md:top-0 md:bottom-0  items-center justify-between relative md:w-64 z-10 py-2 px-1 rounded-2xl">
//           <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
//             {/* Mobile hamburger */}
//             <button
//               className="cursor-pointer text-neutral-800 opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-gray-300"
//               type="button"
//               onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
//             >
//               <Menu className="h-5 w-5" />
//             </button>

//             {/* Logo */}
//             <div className="flex items-center justify-between h-16">
//               <Link href="/" className="flex items-center gap-3">
//                 <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500 text-white font-bold shadow-md">
//                   AT
//                 </div>
//                 <div>
//                   <h1 className="font-bold text-lg text-gray-800">AL-TABIB</h1>
//                   <p className="text-xs text-gray-500">Medical Dashboard</p>
//                 </div>
//               </Link>
//             </div>

//             {/* Mobile user dropdown */}
//             <ul className="md:hidden items-center flex flex-wrap list-none">
//               <li className="inline-block relative">
//                 <UserDropdown />
//               </li>
//             </ul>

//             {/* Sidebar content */}
//             <div
//               className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}
//             >
//               {/* Mobile header */}
//               <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-gray-200">
//                 <div className="flex flex-wrap">
//                   <div className="w-6/12">
//                     <Link
//                       href="/"
//                       className="md:block text-left text-gray-600 mr-0 inline-block whitespace-nowrap text-xl font-bold px-0"
//                     >
//                       AL-TABIB
//                     </Link>
//                   </div>
//                   <div className="w-6/12 flex justify-end">
//                     <button
//                       type="button"
//                       className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
//                       onClick={() => setCollapseShow("hidden")}
//                     >
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Mobile search */}
//               <form className="mt-1 mb-4 md:hidden">
//                 <div className="mb-3 pt-0">
//                   <input
//                     type="text"
//                     placeholder="Search"
//                     className="px-4 py-2 h-10 border border-gray-300 placeholder-gray-400 text-gray-600 bg-white rounded-lg text-sm leading-snug shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full font-normal"
//                   />
//                 </div>
//               </form>

//               <hr className="md:none my-4 md:my-0 md:min-w-full" />

//               {/* Navigation */}
//               <ul className="md:flex-col md:min-w-full flex flex-col list-none mt-6 ">
//                 <li className="items-center">
//                   <Link
//                     href="/dashboard"
//                     className={`py-3 px-4  w-52 rounded-lg font-medium flex items-center transition-colors duration-200 ${
//                       pathname === "/dashboard"
//                         ? "text-blue-500 bg-blue-50"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <LayoutDashboard
//                       size={20}
//                       className={`mr-3 ${
//                         pathname === "/dashboard"
//                           ? "text-blue-500"
//                           : "text-gray-500"
//                       }`}
//                     />
//                     Dashboard
//                   </Link>
//                 </li>

//                 <li className="items-center">
//                   <Link
//                     href="/dashboard/entities"
//                     className={`py-3 px-4 w-52 rounded-lg font-medium flex items-center transition-colors duration-200 ${
//                       pathname === "/dashboard/entities"
//                         ? "text-blue-500 bg-blue-50"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <Boxes
//                       size={20}
//                       className={`mr-3 ${
//                         pathname === "/dashboard/entities"
//                           ? "text-blue-500"
//                           : "text-gray-500"
//                       }`}
//                     />
//                     Entities
//                   </Link>
//                 </li>
//                 <li className="items-center">
//                   <Link
//                     href="/settings"
//                     className={`py-3 px-4 w-52 rounded-lg font-medium flex items-center transition-colors duration-200 ${
//                       pathname === "/dashboard/settings"
//                         ? "text-blue-500 bg-blue-50"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     <Wrench
//                       size={20}
//                       className={`mr-3 ${
//                         pathname === "/dashboard/settings"
//                           ? "text-blue-500"
//                           : "text-gray-500"
//                       }`}
//                     />
//                     Settings
//                   </Link>
//                 </li>

//               </ul>
//             </div>
//           </div>
//         </nav>
//         </FadeInSection>
//       </>
//     );
//   }

"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard, Wrench, Boxes, LogOut } from "lucide-react";
// import UserDropdown from "@/components/Dropdowns/UserDropdown.js";
import { usePathname } from "next/navigation";
import { FadeInSection } from "../Animation";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  return (
    <>
      <FadeInSection delay={0.2}>
        <nav className="md:fixed md:top-0 md:bottom-0  items-center justify-between relative md:w-64 z-10 py-2 px-1 rounded-2xl">
          <h2 className="text-secondary text-osama">Al-Tabib</h2>
        </nav>
      </FadeInSection>
    </>
  );
}
