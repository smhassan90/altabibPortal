import React, { useState } from "react";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
// Assets
import bgImage from "assets/img/bgImage.jpg";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { localUrl } from "env";
import axios from "axios";
import Lottie from "react-lottie";
import heartLoader from "animations/HeartLoader.json";
import { homeUrl } from "env";

function SignIn() {
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //heart loader config
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartLoader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const colorIcons = useColorModeValue("gray.700", "white");
  const bgIcons = useColorModeValue("trasnparent", "navy.700");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");

  //DUMMY VALIDATION
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  //VALIDATION
  const handleSignIn = () => {
    // Form validation
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (formData.username == "admin") {
      newErrors.username = "User doesn't exist";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else {
      newErrors.username = "";
      newErrors.password = "";
    }

    setErrors(newErrors);

    if (!isValid) {
      // Redirect to the admin dashboard
      history.push("/admin/dashboard");
    }
    console.log("ERRORS:", errors);
  };

  const handleLogin = () => {
    setIsOpen(true);
    axios
      .get(
        `${homeUrl}login?username=${userName}&password=${password}&type=4&UUID=AIIFWNIONIO1344112`
      )
      .then((res) => {
        console.log(
          "LOGIN RESPONSE:",
          JSON.stringify(res.data.data.token, null, 2)
        );
        if (res.data.status === "200") {
          console.log("LOGIN SUCCESSFUL");
          localStorage.setItem("token", JSON.stringify(res.data.data.token));
          setTimeout(() => {
            setIsOpen(false);
            history.push("/admin/dashboard");
          }, 2000);
        } else {
          console.log("LOGIN FAILED, Code:", res.data.status);
          setTimeout(() => {
            setIsOpen(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsOpen(false);
        console.log("LOGIN ERROR:", err);
      });
  };

  return (
    <>
      <Flex position="relative" mb="40px">
        <Flex
          minH={{ md: "100%" }}
          h={{ sm: "initial", md: "100vh", lg: "100vh" }}
          w="100%"
          maxW="100%"
          justifyContent="space-between"
        >
          <Flex
            w="100%"
            h="100%"
            alignItems="center"
            justifyContent="center"
            mb="60px"
            mt={{ base: "50px", md: "20px" }}
          >
            <Flex
              zIndex="2"
              direction="column"
              w="445px"
              background="transparent"
              borderRadius="15px"
              p="40px"
              mx={{ base: "100px" }}
              m={{ base: "20px", md: "auto" }}
              bg={bgForm}
              boxShadow={useColorModeValue(
                "0px 5px 14px rgba(0, 0, 0, 0.05)",
                "unset"
              )}
            >
              <Text
                fontSize="xl"
                color={textColor}
                fontWeight="bold"
                textAlign="center"
                mb="22px"
              >
                Sign In
              </Text>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Username
                </FormLabel>
                <Input
                  id="userName"
                  isRequired
                  variant="filled"
                  fontSize="sm"
                  ms="4px"
                  type="text"
                  placeholder="your username"
                  mb="24px"
                  size="lg"
                  onChange={handleUserNameChange}
                />
                {errors.username && (
                  <Text marginBottom={10} color="red" fontSize="xs">
                    {errors.username}
                  </Text>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <Input
                  id="passWord"
                  isRequired
                  onChange={handlePasswordChange}
                  variant="filled"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="your password"
                  mb="24px"
                  size="lg"
                />
                {errors.password && (
                  <Text marginBottom={10} color="red" fontSize="xs">
                    {errors.password}
                  </Text>
                )}
                <Button
                  onClick={handleLogin}
                  fontSize="10px"
                  variant="dark"
                  fontWeight="bold"
                  w="100%"
                  h="45"
                  mb="24px"
                >
                  SIGN IN
                </Button>
              </FormControl>
            </Flex>
          </Flex>
          <Box
            overflowX="hidden"
            h="100%"
            w="100%"
            left="0px"
            position="absolute"
            bgImage={bgImage}
            bgSize="cover"
          >
            <Box
              w="100%"
              h="100%"
              bgSize="cover"
              bg="#0066a1"
              opacity="0.8"
            ></Box>
          </Box>
        </Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent height={300} width={300}>
          <ModalBody>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Lottie
                speed={2.0}
                options={defaultOptions}
                height={200}
                width={200}
              />
              <Text fontSize="xl" color={titleColor}>
                Logging in
              </Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignIn;
