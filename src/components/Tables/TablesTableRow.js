import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function TablesTableRow(props) {
  const {
    avatar,
    name,
    userName,
    specialization,
    qualification,
    earning,
    pending,
    isLast,
    success,
  } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const titleColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        pl="0px"
        borderColor={borderColor}
        borderBottom={isLast ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={avatar} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={titleColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {userName}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {specialization}
          </Text>
          <Flex direction={"row"} gap={2}>
            {qualification.map((item, index) => {
              return (
                <Text
                  key={index}
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="normal"
                >
                  {item}
                </Text>
              );
            })}
          </Flex>
        </Flex>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Badge
          bg={
            parseInt(earning) > 1000
              ? "blue.400"
              : parseInt(earning) > 500
              ? "green.400"
              : parseInt(earning) >= 100
              ? "yellow.400"
              : bgStatus
          }
          color={earning === "Online" ? "white" : "white"}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
          fontWeight={"normal"}
        >
          {"Rs. " + earning}
        </Badge>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Text fontSize="md" color={textColor} fontWeight="normal" pb=".5rem">
          {pending}
        </Text>
      </Td>
      <Td borderColor={borderColor} borderBottom={isLast ? "none" : null}>
        <Button p="0px" bg="transparent" variant="no-effects">
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="normal"
            cursor="pointer"
          >
            {success}
          </Text>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
