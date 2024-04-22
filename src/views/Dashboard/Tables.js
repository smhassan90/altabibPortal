// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesProjectRow from "components/Tables/TablesProjectRow";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";
import {
  tablesProjectData,
  tablesTableData,
  patientData,
} from "variables/general";

function Tables() {
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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
      <Card my="22px" overflowX={{ sm: "scroll", xl: "hidden" }} pb="0px">
        <CardHeader p="6px 0px 22px 0px">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold" pb=".5rem">
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
                  Follow-up
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Status
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Fees
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {patientData.map((row, index, arr) => {
                return (
                  <TablesProjectRow
                    patientName={row.patientName}
                    token={row.token}
                    age={row.age}
                    drName={row.drName}
                    followUp={row.followUp}
                    status={row.status}
                    fees={row.fees}
                    isLast={index === arr.length - 1 ? true : false}
                    key={index}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
