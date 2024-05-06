// Chakra imports
import {
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import { homeUrl } from "env";
import React, { useEffect, useState } from "react";
import {
  tablesProjectData,
  tablesTableData,
  patientData,
} from "variables/general";
import AppTableRow from "components/Tables/AppointmentsTable";

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const date = dayjs().format("YYYY-MM-DD");
    console.log(date);
    console.log(token);
    axios
      .get(
        `${homeUrl}viewAppointments?token=${token}&visitDate=${date}&clinicId=0&patientId=0&doctorId=0&appointmentId=0&followupDate`
      )
      .then((res) => {
        console.log("RESPONSE VIEW APPS:", JSON.stringify(res, null, 2));
        res.data.data.appointments.map((app) => {
          var Apps = [];
          Apps.push(app);
        });
        setLoading(false);
        setAppointments(res.data.data.appointments);
      })
      .catch((err) => {
        console.log("ERROR VIEW APPS:", err);
      });
  }, []);

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="xl" color={textColor} fontWeight="bold">
            Doctors
          </Text>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color={textColor}>
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th pl="0px" borderColor={borderColor} color="gray.400">
                  Name
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  specialization
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Earnings
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Pending
                </Th>
                <Th borderColor={borderColor} color="gray.400">
                  Successfull
                </Th>
                <Th borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {tablesTableData.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    name={row.name}
                    avatar={row.avatar}
                    userName={row.userName}
                    specialization={row.specialization}
                    qualification={row.qualification}
                    earning={row.earning}
                    pending={row.pending}
                    success={row.success}
                    isLast={index === arr.length - 1 ? true : false}
                    key={index}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
      {loading ? null : (
        <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex direction="column">
              <Text
                fontSize="lg"
                color={textColor}
                fontWeight="bold"
                pb=".5rem"
              >
                Appointments
              </Text>
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
                    Token
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Age
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Doctor
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Status
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    BP
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Diagnosis
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Prescription
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Weight
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Follow-up
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Fees
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {appointments.map((row, index, arr) => {
                  return (
                    <AppTableRow
                      patientName={row.patientName}
                      token={row.tokenNumber}
                      age={row.age}
                      doctorName={row.doctorName}
                      followUp={row.followUp}
                      bloodPressure={row.bloodPressure}
                      diagnosis={row.diagnosis}
                      prescription={row.prescription}
                      weight={row.weight}
                      followupDate={row.followupDate}
                      status={row.status}
                      charges={row.charges}
                      isLast={index === arr.length - 1 ? true : false}
                      key={index}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </Flex>
  );
}

export default Tables;
