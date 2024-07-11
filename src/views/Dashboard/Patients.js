import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/Card/Card";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
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
  const [selectedDoctor, setSelectedDoctor] = useState("All");
  const [searchPatient, setSearchPatient] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [
    selectedPatientAppointments,
    setSelectedPatientAppointments,
  ] = useState([]);

  const filterPatients = () => {
    let filteredAppointments = appointments;

    if (selectedDoctor !== "All") {
      filteredAppointments = filteredAppointments.filter(
        (patient) => patient.doctorName === selectedDoctor
      );
    }

    if (searchPatient) {
      filteredAppointments = filteredAppointments.filter((patient) =>
        patient.patientName.toLowerCase().includes(searchPatient.toLowerCase())
      );
    }

    // Filter out duplicate patients
    const uniquePatients = filteredAppointments.filter(
      (patient, index, arr) => {
        return (
          arr.findIndex((p) => p.patientId === patient.patientId) === index
        );
      }
    );

    return uniquePatients;
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

  const handleOpenModal = (patient) => {
    console.log("Patient:", JSON.stringify(patient, null, 1));
    const patientAppointments = appointments.filter((appointment) => {
      return (
        appointment.patientId === patient.patientId &&
        (selectedDoctor === "All" || appointment.doctorName === selectedDoctor)
      );
    });
    setSelectedPatientAppointments(patientAppointments);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedPatientAppointments([]);
  };

  useEffect(() => {
    setPatientList(filterPatients());
  }, [selectedDoctor, searchPatient, appointments]);

  useEffect(() => {
    axios
      .get(`${homeUrl}getClinicPatients?token=123456789&doctorId=0`)
      .then((res) => {
        console.log("Response:", JSON.stringify(res, null, 1));
        setPatientList(filterPatients(res.data.data.clinicAppointments));
        setAppointmentList(res.data.data.clinicAppointments);
        const uniqueDoctorNames = Array.from(
          new Set(
            res.data.data.clinicAppointments.map((doctor) => doctor.doctorName)
          )
        );

        setDoctorList(uniqueDoctorNames);

        console.log("Doctors:", uniqueDoctorNames);
        //console.log("Appointments:", JSON.stringify(appointments, null, 1));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

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
              <Flex gap={5} pb=".5rem">
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
                <Input
                  borderWidth={3}
                  borderRadius={10}
                  variant="outline"
                  value={searchPatient}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^[a-zA-Z\s]*$/;
                    if (regex.test(inputValue) || inputValue === "") {
                      setSearchPatient(inputValue);
                    }
                  }}
                  type="text"
                  placeholder="Search Patient"
                />
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Table variant="simple" color={textColor}>
              <Thead>
                <Tr>
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
                  <Th color="gray.400" borderColor={borderColor}>
                    History
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {patientList.map((patient, patientIndex, arr) => (
                  <Tr key={patientIndex}>
                    <Td pl={0} width="30%" borderColor={borderColor}>
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="semibold"
                        pb=".5rem"
                      >
                        {patient.patientName}
                      </Text>
                    </Td>
                    <Td width="10%" borderColor={borderColor}>
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="normal"
                        pb=".5rem"
                      >
                        {patient.patientAge}
                      </Text>
                    </Td>
                    <Td width="10%" borderColor={borderColor}>
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="normal"
                        pb=".5rem"
                      >
                        {patient.patientGender}
                      </Text>
                    </Td>
                    <Td width="15%" borderColor={borderColor}>
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="normal"
                        pb=".5rem"
                      >
                        {patient.patientCellNumber}
                      </Text>
                    </Td>
                    <Td width="10%" borderColor={borderColor}>
                      <Text
                        fontSize="md"
                        color={textColor}
                        fontWeight="normal"
                        pb=".5rem"
                      >
                        {countAppointments(patient.patientId)}
                      </Text>
                    </Td>
                    <Td width="30%" borderColor={borderColor}>
                      <Button
                        width="70%"
                        onClick={() => handleOpenModal(patient)}
                        colorScheme="blue"
                        size="md"
                      >
                        View History
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="1080px" maxHeight={"600px"} overflow={"auto"}>
          <ModalHeader>Past Appointments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    S No.
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Age
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Visit Date
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Doctor Name
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Weight (kg)
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Diagnosis
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Prescription
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Follow-up Date
                  </Th>
                  <Th pl="0px" color="gray.400" borderColor={borderColor}>
                    Charges (PKR)
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedPatientAppointments.map((appointment, index) => (
                  <Tr key={index}>
                    <Td pl="0px">{index + 1}</Td>
                    <Td pl="0px">{appointment.patientAge}</Td>
                    <Td pl="0px">{appointment.visitDate}</Td>
                    <Td pl="0px">{appointment.doctorName}</Td>
                    <Td pl="0px">{appointment.weight}</Td>
                    <Td pl="0px">{appointment.diagnosis}</Td>
                    <Td pl="0px">{appointment.prescription}</Td>
                    <Td pl="0px">{appointment.followupDate}</Td>
                    <Td>{appointment.appointmentCharges}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Patients;
