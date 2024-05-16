import React, { useState } from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Avatar,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Th,
  Tr as ModalTr,
  Td as ModalTd,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";

function PatientTable(props) {
  const {
    name,
    address,
    age,
    gender,
    cellNumber,
    numberOfAppointments,
    isLast,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const bgStatus = useColorModeValue("gray.400", "navy.900");

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Tr>
        <Td
          pl="0px"
          borderColor={borderColor}
          borderBottom={isLast ? "none" : null}
        >
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Flex direction="column">
              <Text
                fontSize="md"
                color={titleColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {name}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td width={"20%"} borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
            {age}
          </Text>
        </Td>
        <Td width={"20%"} borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
            {gender}
          </Text>
        </Td>
        <Td width={"20%"} borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
            {cellNumber}
          </Text>
        </Td>
        <Td width={"20%"} borderColor={borderColor}>
          <Button
            width={"60%"}
            onClick={handleOpenModal}
            colorScheme="blue"
            size="md"
          >
            {numberOfAppointments}
          </Button>
        </Td>
      </Tr>

      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent minWidth="900px">
          <ModalHeader>Past Appointments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Visit Date</Th>
                  <Th>Doctor</Th>
                  <Th>Diagnosis</Th>
                  <Th>Prescription</Th>
                  <Th>Follow-up Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                <ModalTr>
                  <ModalTd>Syed Anas Ahmed</ModalTd>
                  <ModalTd>9-05-2024</ModalTd>
                  <ModalTd>Dr. Furqan</ModalTd>
                  <ModalTd>Malaria</ModalTd>
                  <ModalTd>Panadol</ModalTd>
                  <ModalTd>15-05-2024</ModalTd>
                </ModalTr>
                <ModalTr>
                  <ModalTd>Syed Anas Ahmed</ModalTd>
                  <ModalTd>9-05-2024</ModalTd>
                  <ModalTd>Dr. Furqan</ModalTd>
                  <ModalTd>Malaria</ModalTd>
                  <ModalTd>Panadol</ModalTd>
                  <ModalTd>15-05-2024</ModalTd>
                </ModalTr>
                <ModalTr>
                  <ModalTd>Syed Anas Ahmed</ModalTd>
                  <ModalTd>9-05-2024</ModalTd>
                  <ModalTd>Dr. Furqan</ModalTd>
                  <ModalTd>Malaria</ModalTd>
                  <ModalTd>Panadol</ModalTd>
                  <ModalTd>15-05-2024</ModalTd>
                </ModalTr>
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PatientTable;
