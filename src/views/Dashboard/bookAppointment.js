import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Calendar } from "assets/icons/Calendar";
import { Doctor } from "assets/icons/Doctor";
import { Gender } from "assets/icons/Gender";
import { Phone } from "assets/icons/Phone";
import { User } from "assets/icons/User";
import Card from "components/Card/Card";
import React, { useEffect, useState } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import Lottie from "react-lottie";
import heartLoader from "animations/HeartLoader.json";
import successfull from "animations/Success.json";
import axios from "axios";
import { homeUrl } from "env";

function bookAppointment() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [startDate, setStartDate] = useState(new Date());

  const date = dayjs(startDate).format("YYYY-MM-DD");
  const titleColor = useColorModeValue("gray.700", "blue.500");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("");

  const [animationData, setAnimationData] = useState(heartLoader);
  const [message, setMessage] = useState("Booking Appointment Please wait");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [app, setApp] = useState();
  const [err, setErr] = useState();

  const handleCloseModal = () => {
    setIsSubmitting(false);
  };

  const appointmentObj = {
    id: 0,
    visitDate: dayjs().format("YYYY-MM-DD"),
    doctorId: doctor,
  };

  const patientObj = {
    id: 0,
    name: name,
    gender: gender,
    cellNumber: phone,
    dob: date,
    status: 0,
    doctors: [],
  };

  const encodedAppointmentObj = encodeURIComponent(
    JSON.stringify(appointmentObj)
  );
  const encodedPatientObj = encodeURIComponent(JSON.stringify(patientObj));

  const bookDirectApp = () => {
    setSuccess(false);
    setIsSubmitting(true);
    setAnimationData(heartLoader);
    setMessage("Booking Appointment Please wait");
    axios
      .get(
        `${homeUrl}directAppointment?token=${token}&appointment=${encodedAppointmentObj}&patient=${encodedPatientObj}`
      )
      .then((res) => {
        console.log(JSON.stringify(res.data, null, 2));
        if (!res || res.status !== 200) {
          setErr("Error in booking appointment");
        } else {
          setTimeout(() => {
            setAnimationData(successfull);
            setApp(res.data.data.appointments[0]);
            setMessage("Appointment Booked Successfully");
            setSuccess(true);
          }, 3000);
        }
      })
      .catch((err) => {
        setErr(err);
      });
  };

  const defaultOptions = {
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Flex
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
                onChange={(e) => setGender(e)}
                defaultValue="male"
              >
                <HStack spacing="24px">
                  <Radio value="female">Female</Radio>
                  <Radio value="male">Male</Radio>
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
                <option value={1}>Dr. Furqan</option>
                <option value={2}>Dr. Bangash</option>
                <option value={3}>Dr. Beenish</option>
                <option value={4}>Dr. Micheal Ghouri</option>
                <option value={5}>Dr. Faheem Ahmed</option>
                <option value={6}>Dr. Faheem Ahmed</option>
                <option value={7}>Dr. Faheem Ahmed</option>
              </Select>
            </Flex>
            <Flex alignItems={"center"} maxW={500}>
              <Button
                loadingText="Submitting"
                onClick={bookDirectApp}
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
      <Modal isOpen={isSubmitting} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex
              p={5}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Lottie
                loop={isSubmitting ? true : false}
                speed={1.0}
                options={defaultOptions}
                height={200}
                width={200}
              />
              <Text fontSize={"large"} color={success ? "green.500" : null}>
                {message}
              </Text>
              {success && (
                <Flex pt={5} flexDirection={"column"} width={"100%"}>
                  <Flex flexDirection={"row"}>
                    <Text fontSize={"large"}>Token:</Text>
                    <Text fontSize={"large"} fontWeight={"bold"}>
                      {app.tokenNumber}
                    </Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Text fontSize={"large"}>Visit Date:</Text>
                    <Text fontSize={"large"} fontWeight={"bold"}>
                      {app.visitDate}
                    </Text>
                  </Flex>
                  <Flex flexDirection={"row"}>
                    <Text fontSize={"large"}>Charges:</Text>
                    <Text fontSize={"large"} fontWeight={"bold"}>
                      {app.charges}
                    </Text>
                  </Flex>
                </Flex>
              )}
              <Button
                loadingText="Close"
                onClick={handleCloseModal}
                color={"white"}
                backgroundColor={"blue.500"}
                mt={4}
                type="submit"
                alignSelf={"center"}
                width={"100%"}
              >
                Close
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default bookAppointment;
