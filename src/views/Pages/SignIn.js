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
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.png";
import bgImage from "assets/img/bgImage.jpg";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignIn() {
  const history = useHistory();

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

  //UPDATE VALUES AS USER KEEPS INPUTING
  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Reset error message when user starts typing
    setErrors({ ...errors, [name]: "" });
  };

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

  return (
    <Flex position="relative" mb="40px">
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ md: "0px" }}
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
                onChange={handleInputChange}
                value={formData.username}
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
                onChange={handleInputChange}
                value={formData.password}
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
                onClick={handleSignIn}
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
  );
}

export default SignIn;
