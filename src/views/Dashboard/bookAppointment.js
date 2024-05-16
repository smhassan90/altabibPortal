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
import { Calendar } from "assets/icons/Calendar";
import { Doctor } from "assets/icons/Doctor";
import { Gender } from "assets/icons/Gender";
import { Phone } from "assets/icons/Phone";
import { User } from "assets/icons/User";
import Card from "components/Card/Card";
import React, { useState } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const MyContainer = ({ className, children }) => {
  return (
    <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
      <CalendarContainer className={className}>
        <div style={{ background: "#f0f0f0" }}>What is your favorite day?</div>
        <div style={{ position: "relative" }}>{children}</div>
      </CalendarContainer>
    </div>
  );
};

function bookAppointment() {
  const [startDate, setStartDate] = useState(new Date());

  const date = dayjs(startDate).format("YYYY-MM-DD");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");

  const registerSetApp = () => {
    const registerObj = {
      name: name,
      gender: "male",
      password: "password123",
      cellNumber: phone,
      dob: date,
    };
    const appObj = {
      id: 1,
      patientName: name,
      clinicName: "General Hospital",
      doctorName: "Dr. Smith",
      visitDate: date,
      tokenNumber: 123,
      status: 1,
      clinicTotalAppointments: 50,
      clinicLastAppointmentToken: 49,
      charges: 50,
      prescription: "Medicine A, Medicine B",
      diagnosis: "Common Cold",
      age: 30,
      weight: 70,
      bloodPressure: "120/80",
      followupDate: "2024-03-19",
      patientId: 101,
      clinicId: 2,
      doctorId: 2,
      treatments: [
        { id: 1, name: "Treatment A", detail: "Details A" },
        { id: 2, name: "Treatment B", detail: "Details B" },
      ],
    };
  };

  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <Flex
      backgroundColor={"red"}
      gap={5}
      height={"100vh"}
      flexDirection="column"
      pt={{ base: "120px", md: "75px" }}
    >
      <FormControl isRequired>
        <Flex direction={"column"} gap={5}>
          <Flex
            gap={3}
            alignItems={"center"}
            borderWidth={1}
            borderRadius={10}
            padding={2}
            maxW={500}
            backgroundColor={"white"}
          >
            <User />
            <Flex width={0.5} height={10} backgroundColor={"lightgray"} />
            <Input
              value={name}
              onChange={(e) => {
                const inputValue = e.target.value;
                const regex = /^[a-zA-Z\s]*$/;
                if (regex.test(inputValue) || inputValue === "") {
                  setName(inputValue);
                }
              }}
              borderWidth={0}
              type="text"
              placeholder="Name"
            />
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            borderWidth={1}
            borderRadius={10}
            padding={2}
            maxW={500}
            backgroundColor={"white"}
          >
            <Phone />
            <Flex width={0.5} height={10} backgroundColor={"lightgray"} />
            <Input
              value={phone}
              onChange={(e) => {
                const inputValue = e.target.value;
                const regex = /^[0-9]*$/;
                if (
                  (regex.test(inputValue) || inputValue === "") &&
                  inputValue.length <= 11
                ) {
                  setPhone(inputValue);
                }
              }}
              borderWidth={0}
              type="tel"
              placeholder="Phone"
            />
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            borderWidth={1}
            borderRadius={10}
            padding={2}
            maxW={500}
            backgroundColor={"white"}
          >
            <Gender />
            <Flex width={0.5} height={10} backgroundColor={"lightgray"} />
            <RadioGroup
              value={gender}
              //onChange={(e) => setGender(e.target.value)}
              defaultValue="Male"
            >
              <HStack spacing="24px">
                <Radio value="Female">Female</Radio>
                <Radio value="Male">Male</Radio>
              </HStack>
            </RadioGroup>
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            borderWidth={1}
            borderRadius={10}
            padding={2}
            maxW={500}
            backgroundColor={"white"}
          >
            <Calendar />
            <Flex width={0.5} height={10} backgroundColor={"lightgray"} />
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat={"d/M/yyyy"}
              placeholderText="Select Appointment Date"
            />
          </Flex>
          <Flex
            gap={3}
            alignItems={"center"}
            borderWidth={1}
            borderRadius={10}
            padding={2}
            backgroundColor={"white"}
            maxW={500}
          >
            <Doctor />
            <Flex width={0.5} height={10} backgroundColor={"lightgray"} />
            <Select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              borderWidth={0}
              placeholder="Select Doctor"
            >
              <option value="Doctor 1">Doctor 1</option>
              <option value="Doctor 2">Doctor 2</option>
              <option value="Doctor 3">Doctor 3</option>
            </Select>
          </Flex>
          <Flex alignItems={"center"} maxW={500}>
            <Button
              loadingText="Submitting"
              onClick={() => {
                console.log("Name", name);
                console.log("Phone", phone);
                console.log("Gender", gender);
                console.log("Date", date);
                console.log("Doctor", doctor);
              }}
              color={"white"}
              backgroundColor={"blue.500"}
              mt={4}
              type="submit"
              alignSelf={"center"}
              width={"100%"}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </FormControl>
    </Flex>
  );
}

export default bookAppointment;
