import {
  Box,
  Flex,
  Select,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/Card/Card";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import PatientTable from "components/Tables/PatientTable";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import axios from "axios";
import { homeUrl } from "env";

function Patients() {
  const [loading, setLoading] = useState(true);
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const [appointments, setAppointmentList] = useState([]);
  const [doctorList, setDoctorList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const filterPatients = () => {
    if (selectedDoctor === "All") {
      return appointments.filter((patient, index, arr) => {
        return (
          arr.findIndex((p) => p.patientId === patient.patientId) === index
        );
      });
    } else {
      return appointments.filter(
        (patient) => patient.doctorName === selectedDoctor
      );
    }
  };

  const countAppointments = (patientId) => {
    if (selectedDoctor === "All") {
      return appointments.filter((patient) => patient.patientId === patientId)
        .length;
    } else {
      return appointments.filter(
        (patient) =>
          patient.patientId === patientId &&
          patient.doctorName === selectedDoctor
      ).length;
    }
  };

  function convertData(clinicData) {
    const clinicDoctorPatients = [];

    // Group appointments by doctor
    const appointmentsByDoctor = clinicData.data.clinicAppointments.reduce(
      (acc, appointment) => {
        acc[appointment.doctorId] = acc[appointment.doctorId] || [];
        acc[appointment.doctorId].push(appointment);
        return acc;
      },
      {}
    );

    // Iterate through doctors
    for (const doctorId in appointmentsByDoctor) {
      const appointments = appointmentsByDoctor[doctorId];
      const doctor = {
        id: parseInt(doctorId),
        name: appointments[0].doctorName,
        patients: [],
      };

      // Group appointments by patient
      const appointmentsByPatient = appointments.reduce((acc, appointment) => {
        acc[appointment.patientId] = acc[appointment.patientId] || [];
        acc[appointment.patientId].push(appointment);
        return acc;
      }, {});

      // Iterate through patients
      for (const patientId in appointmentsByPatient) {
        const patientAppointments = appointmentsByPatient[patientId];
        const patient = {
          id: parseInt(patientId),
          name: patientAppointments[0].patientName,
          dob: "", // You might need to populate this data
          gender: patientAppointments[0].patientGender,
          cellNumber: patientAppointments[0].patientCellNumber,
          appointments: patientAppointments.map((appointment) => ({
            id: appointment.appointmentId,
            token: appointment.appointmentId, // Assuming token is appointmentId
            visitDate: appointment.visitDate,
            followUpDate: appointment.followupDate,
            diagnosis: appointment.diagnosis,
            prescription: appointment.prescription,
            charges: appointment.appointmentCharges,
            bloodPressure: "", // You might need to populate this data
            weight: appointment.weight,
          })),
        };
        doctor.patients.push(patient);
      }
      clinicDoctorPatients.push(doctor);
    }
    return clinicDoctorPatients;
  }

  function getUniquePatients(clinicData) {
    return clinicData.data.clinicAppointments.reduce((unique, appointment) => {
      const existingPatient = unique.find(
        (p) => p.name === appointment.patientName
      );
      if (!existingPatient) {
        unique.push({
          id: appointment.patientId,
          name: appointment.patientName,
          age: appointment.patientAge,
          gender: appointment.patientGender,
          cellNumber: appointment.patientCellNumber,
        });
      }
      return unique;
    }, []);
  }

  function getUniqueDoctors(clinicData) {
    return clinicData.data.clinicAppointments.reduce((unique, appointment) => {
      const existingDoctor = unique.find(
        (d) => d.name === appointment.doctorName
      );
      if (!existingDoctor) {
        unique.push({
          id: appointment.doctorId,
          name: appointment.doctorName,
        });
      }
      return unique;
    }, []);
  }

  useEffect(() => {
    axios
      .get(`${homeUrl}getClinicPatients?token=123456789&doctorId=0`)
      .then((res) => {
        // console.log("Response:", JSON.stringify(res, null, 1));
        setPatientList(filterPatients(res.data.data.clinicAppointments));
        setAppointmentList(res.data.data.clinicAppointments);
        const uniqueDoctorNames = Array.from(
          new Set(
            res.data.data.clinicAppointments.map((doctor) => doctor.doctorName)
          )
        );

        setDoctorList(uniqueDoctorNames);

        console.log("Doctors:", uniqueDoctorNames);
        setTimeout(() => {
          //console.log("Appointments:", JSON.stringify(appointments, null, 1));
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [selectedDoctor]);

  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {loading ? null : (
        <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex direction="row" alignItems={"center"} gap={5}>
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Patients
              </Text>
              <Box fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
                <Select
                  fontWeight="bold"
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  variant="filled"
                >
                  <option value="All">All</option>
                  {doctorList.map((doctor, index) => {
                    return (
                      <option key={index} value={doctor}>
                        {doctor}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr my=".8rem" pl="0px">
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Name
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Age
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Gender
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Cell Number
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Appointments
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {patientList.map((patient, patientIndex, arr) => (
                  <PatientTable
                    name={patient.patientName}
                    age={patient.patientAge}
                    gender={patient.patientGender}
                    cellNumber={patient.patientCellNumber}
                    numberOfAppointments={countAppointments(patient.patientId)}
                    isLast={patientIndex === arr.length - 1 ? true : false}
                    key={patientIndex}
                  />
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
}

export default Patients;
