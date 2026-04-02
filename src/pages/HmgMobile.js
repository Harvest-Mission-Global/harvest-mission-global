import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import bgTop from '../images/BG_top.png';
import background from '../images/background.jpg';

export default function HmgMobile() {
  return (
    <Box bg="white" minH="100vh" display="flex" flexDirection="column">

      {/* Hero Section */}
      <Box
        position="relative"
        minH="43.75rem"
        w="100%"
        bg="white"
        overflow="hidden"
        px="0.25rem"
        backgroundImage={`url(${background})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {/* Map Background */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          w="100%"
          h="25rem"
          opacity={0.2}
        >
          <Image src={bgTop} alt="Background" w="100%" h="100%" />
        </Box>

        {/* Main Content */}
        <VStack
          position="relative"
          zIndex={2}
          w="full"
          spacing="0.5rem"
          py="0.75rem"
        >
          {/* Title */}
          <Text
            fontSize="1.75rem"
            fontWeight="extrabold"
            color="#0025a3"
            fontFamily="'DM Sans', sans-serif"
            textTransform="uppercase"
            letterSpacing="0.125rem"
            textAlign="center"
          >
            Harvest Mission Global
          </Text>

          {/* CTA Buttons - Stacked on mobile */}
          <VStack spacing="0.375rem" w="full">
            <Button
              as="a"
              href="https://www.atx.hmccglobal.org/"
              target="_blank"
              rel="noopener noreferrer"
              bg="transparent"
              border="2px solid"
              borderColor="#0025a3"
              color="#0025a3"
              backdropFilter="blur(15px)"
              bgColor="rgba(226, 233, 255, 0.01)"
              px="0.375rem"
              py="0.25rem"
              h="auto"
              minH="3.75rem"
              borderRadius="1rem"
              fontFamily="'DM Sans', sans-serif"
              fontSize="1rem"
              fontWeight="extrabold"
              w="full"
              _hover={{
                bgColor: 'rgba(226, 233, 255, 0.05)',
              }}
            >
              Austin →
            </Button>
            <Button
              as="a"
              href="https://hk.hmccglobal.org/"
              target="_blank"
              rel="noopener noreferrer"
              bg="transparent"
              border="2px solid"
              borderColor="#0025a3"
              color="#0025a3"
              backdropFilter="blur(15px)"
              bgColor="rgba(226, 233, 255, 0.01)"
              px="0.375rem"
              py="0.25rem"
              h="auto"
              minH="3.75rem"
              borderRadius="1rem"
              fontFamily="'DM Sans', sans-serif"
              fontSize="1rem"
              fontWeight="extrabold"
              w="full"
              _hover={{
                bgColor: 'rgba(226, 233, 255, 0.05)',
              }}
            >
              Hong Kong →
            </Button>
          </VStack>

          {/* Main CTA Button */}
          <Button
            bgGradient="linear(90deg, #0025A3 0%, #5D6FAC 100%)"
            color="white"
            borderRadius="1rem"
            px="0.375rem"
            py="0.25rem"
            h="auto"
            minH="5rem"
            fontFamily="'DM Sans', sans-serif"
            backdropFilter="blur(15px)"
            border="1px solid"
            borderColor="#0025a3"
            w="full"
            _hover={{
              opacity: 0.9,
            }}
          >
            <VStack spacing="0.0625rem">
              <Text fontSize="0.75rem" fontWeight="normal">
                Learn about our
              </Text>
              <Text fontSize="0.875rem" fontWeight="bold" textTransform="uppercase">
                10 Year Commitment
              </Text>
              <Text fontSize="0.75rem" fontWeight="normal">
                as a Global Family of Churches
              </Text>
            </VStack>
          </Button>
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        mt="auto"
        bg="#e0e8ff"
        py="0.25rem"
        px="0.25rem"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="0.125rem"
        textAlign="center"
      >
        <Text
          fontSize="0.6875rem"
          color="#0025a2"
          fontFamily="'DM Sans', sans-serif"
          whiteSpace="pre-wrap"
        >
          Contact us at admin@hmccglobal.org | © 1996-2026 Harvest Mission Global. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
