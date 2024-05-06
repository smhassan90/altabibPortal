import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import React from "react";

function bookAppointment() {
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <Flex gap={5} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Card>
        <FormControl isRequired>
          <Flex direction={"column"} gap={5}>
            <Flex maxWidth={500} alignItems={"center"} flexDirection={"row"}>
              <FormLabel>Patient Name</FormLabel>
              <Input maxWidth={200} type="email" />
            </Flex>
            <Flex maxWidth={500} alignItems={"center"} flexDirection={"row"}>
              <FormLabel>Phone</FormLabel>
              <Input maxWidth={200} type="email" />
            </Flex>
            <Flex maxWidth={500} alignItems={"center"} flexDirection={"row"}>
              <FormLabel aria-required>Gender</FormLabel>
              <RadioGroup defaultValue="Male">
                <HStack spacing="24px">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </HStack>
              </RadioGroup>
            </Flex>
            <Flex maxWidth={500} alignItems={"center"} flexDirection={"row"}>
              <FormLabel>Date of Birth</FormLabel>
              <Input maxWidth={200} type="email" />
            </Flex>
            <Flex maxWidth={500} alignItems={"center"} flexDirection={"row"}>
              <FormLabel>Doctor</FormLabel>
              <Select maxWidth={200} placeholder="Select option">
                <option value="option1">Doctor 1</option>
                <option value="option2">Doctor 2</option>
                <option value="option3">Doctor 3</option>
              </Select>
            </Flex>
            <Button
              loadingText="Submitting"
              onClick={() => {
                console.log(token);
              }}
              color={"white"}
              backgroundColor={"blue.500"}
              mt={4}
              type="submit"
              width={"15%"}
            >
              Submit
            </Button>
          </Flex>
        </FormControl>
      </Card>
    </Flex>
  );
}

export default bookAppointment;
