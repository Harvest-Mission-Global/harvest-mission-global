import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const SRC = "https://hk.hmccglobal.org/10y-commitment?embed=1";

export default function TenYearCommitment() {
  return (
    <Box position="relative" w="100%" h="100vh">
      <Button
        as={Link}
        to="/"
        position="absolute"
        top={{ base: "1rem", md: "1.5rem" }}
        left={{ base: "1rem", md: "1.5rem" }}
        zIndex={1}
        bg="white"
        border="2px solid"
        borderColor="#0025a3"
        color="#0025a3"
        px={{ base: "1rem", md: "1.875rem" }}
        py={{ base: "0.5rem", md: "1rem" }}
        h="auto"
        borderRadius={{ base: "1rem", md: "1.25rem" }}
        fontFamily="'DM Sans', sans-serif"
        fontSize={{ base: "1rem", md: "1.25rem" }}
        fontWeight="extrabold"
        _hover={{
          bgColor: "#0025a3",
          color: "white",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="0.5rem"
      >
        <FiArrowLeft /> Back
      </Button>
      <Box
        as="iframe"
        src={SRC}
        title="10 Year Commitment"
        w="100%"
        h="100vh"
        border="0"
        display="block"
      />
    </Box>
  );
}
