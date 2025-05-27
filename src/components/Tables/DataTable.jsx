"use client"

import { useState, useRef } from "react"
import Image from "next/image"

export default function AppointmentManagement() {
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [selectedDate, setSelectedDate] = useState("Select Date")
  const [expandedHistory, setExpandedHistory] = useState(null)
  const [ageSortOrder, setAgeSortOrder] = useState(null)
  const [expandedPatientInfo, setExpandedPatientInfo] = useState(false)

  const patientInfoRef = useRef(null)

  const [patients, setPatients] = useState([
    {
      id: 86,
      name: "Khadija",
      age: 17,
      visitDate: "2025-05-09",
      clinic: "Diabetes & Foot Care",
      doctor: "Syed Faheem Ahmed",
      status: "Successful",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 86,
      name: "Ahmed Raza",
      age: 18,
      visitDate: "2025-05-09",
      clinic: "Diabetes & Foot Care",
      doctor: "Syed Faheem Ahmed",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])

  const historyDates = ["May 03, 25", "Apr 10, 25", "Mar 01, 25"]

  const toggleHistory = (date) => {
    setExpandedHistory(expandedHistory === date ? null : date)
  }

  const sortByAge = () => {
    const newSortOrder = ageSortOrder === "asc" ? "desc" : "asc"
    setAgeSortOrder(newSortOrder)

    const sortedPatients = [...patients].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a.age - b.age
      } else {
        return b.age - a.age
      }
    })

    setPatients(sortedPatients)
  }

  const scrollToPatientInfo = () => {
    setExpandedPatientInfo(true)
    setTimeout(() => {
      patientInfoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }, 100)
  }

  const getSortIcon = () => {
    if (ageSortOrder === "asc") {
      return (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      )
    } else if (ageSortOrder === "desc") {
      return (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      )
    } else {
      return (
        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      )
    }
  }

  return (
      <div className="mt-ratio1">
        {/* Main Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  <button
                    onClick={sortByAge}
                    className="flex items-center space-x-1 hover:text-gray-700 transition-colors"
                  >
                    <span>Age</span>
                    {getSortIcon()}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Visit_date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Clinic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  App_Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span>{patient.id}</span>
                      <button
                        onClick={scrollToPatientInfo}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View patient details"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Image
                        src={patient.avatar || "/placeholder.svg"}
                        alt={patient.name}
                        width={32}
                        height={32}
                        className="rounded-full mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {patient.visitDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.clinic}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status === "Successful" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Patient Information Section */}
        <div
          ref={patientInfoRef}
          className={`bg-white rounded-lg shadow transition-all duration-300 mb-6 ${
            expandedPatientInfo ? "ring-2 ring-blue-500 ring-opacity-50" : ""
          }`}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Patient Information</h2>
              <button
                onClick={() => setExpandedPatientInfo(!expandedPatientInfo)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className={`h-5 w-5 transform transition-transform ${expandedPatientInfo ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                expandedPatientInfo ? "max-h-96 opacity-100" : "max-h-32 opacity-70"
              }`}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Blood Pressure:</label>
                  <span className="text-sm text-gray-500">Not Found</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Prescription:</label>
                  <span className="text-sm text-gray-500">Not Found</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Diagnosis:</label>
                  <span className="text-sm text-gray-500">Not Found |</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Weight:</label>
                  <span className="text-sm text-gray-500">Not Found</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Followup Date:</label>
                  <span className="text-sm text-gray-500">Not Found</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Token Number:</label>
                  <span className="text-sm text-gray-900 font-medium">1</span>
                </div>

                {expandedPatientInfo && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Temperature:</label>
                      <span className="text-sm text-gray-500">98.6°F</span>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Heart Rate:</label>
                      <span className="text-sm text-gray-500">72 BPM</span>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Allergies:</label>
                      <span className="text-sm text-gray-500">None Known</span>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Insurance:</label>
                      <span className="text-sm text-gray-500">Active</span>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Emergency Contact:</label>
                      <span className="text-sm text-gray-500">+92 300 1234567</span>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Last Visit:</label>
                      <span className="text-sm text-gray-500">2025-04-15</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Patient History Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient History</h2>
          <div className="space-y-2">
            {historyDates.map((date) => (
              <div key={date} className="border border-gray-200 rounded-md">
                <button
                  onClick={() => toggleHistory(date)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-900">{date}</span>
                  <svg
                    className={`h-4 w-4 text-gray-400 transform transition-transform ${
                      expandedHistory === date ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedHistory === date && (
                  <div className="px-4 pb-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mt-2">History details for {date}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Add Appointment
          </button>
        </div>

        {/* Additional Patient Rows */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <table className="w-full">
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient, index) => (
                <tr key={`additional-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <span>{patient.id}</span>
                      <button
                        onClick={scrollToPatientInfo}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View patient details"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Image
                        src={patient.avatar || "/placeholder.svg"}
                        alt={patient.name}
                        width={32}
                        height={32}
                        className="rounded-full mr-3"
                      />
                      <span className="text-sm font-medium text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {patient.visitDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.clinic}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        index === 0 ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {index === 0 ? "Pending" : "Successful"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="text-sm text-gray-700">Showing 1-25 of 333</span>
          </div>

          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">{"<"}</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
            <span className="px-2 text-sm text-gray-500">...</span>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">9</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">10</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">{">"}</button>
          </div>
        </div>
      </div>
  )
}