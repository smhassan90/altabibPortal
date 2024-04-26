import React, { useState } from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
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

function DashboardTableRow(props) {
  const {
    image,
    patientName,
    status,
    age,
    fees,
    drName,
    token,
    followUp,
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
          minWidth={{ sm: "250px" }}
          pl="0px"
          borderColor={borderColor}
          borderBottom={isLast ? "none" : null}
        >
          <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
            <Avatar src={image} w="50px" borderRadius="12px" me="18px" />
            <Flex direction="column">
              <Text
                fontSize="md"
                color={titleColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {patientName}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
            {token}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
            {age}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
            {drName}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
            {followUp}
          </Text>
        </Td>
        <Td borderColor={borderColor}>
          <Badge
            bg={status === "Completed" ? "blue.400" : "yellow.400"}
            color={status === "Online" ? "white" : "white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
            fontWeight={"normal"}
          >
            {status}
          </Badge>
        </Td>
        <Td borderColor={borderColor}>
          <Button onClick={handleOpenModal} colorScheme="blue" size="sm">
            {fees}
          </Button>
        </Td>
      </Tr>

      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Fee Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Treatment</Th>
                  <Th>Charges</Th>
                </Tr>
              </Thead>
              <Tbody>
                <ModalTr>
                  <ModalTd>OPD</ModalTd>
                  <ModalTd>300</ModalTd>
                </ModalTr>
                <ModalTr>
                  <ModalTd>CBC</ModalTd>
                  <ModalTd>200</ModalTd>
                </ModalTr>
                <ModalTr>
                  <ModalTd>Urine Test</ModalTd>
                  <ModalTd>500</ModalTd>
                </ModalTr>
              </Tbody>
            </Table>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DashboardTableRow;
