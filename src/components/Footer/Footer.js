/*eslint-disable*/
import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer(props) {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="center"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "center",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">
          {document.documentElement.dir === "rtl"
            ? "محبت کے ساتھ بنایا گیا"
            : "Made by "}
        </Text>
        <Link color="blue.400" href="https://www.fynals.com" target="_blank">
          {document.documentElement.dir === "rtl"
            ? " فائنل سولیوشنز"
            : "Fynal Solutions "}
        </Link>
      </Text>
    </Flex>
  );
}
