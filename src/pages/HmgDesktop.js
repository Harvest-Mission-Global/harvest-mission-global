import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import background from '../images/BG_top.png';
import ripple from '../images/ripple.png';

export default function HmgDesktop() {
  return (
    <Box bg="white" minH="100vh" display="flex" flexDirection="column">

      {/* Hero Section */}
      <Box 
        position="relative"
        h="45rem"
        w="90rem"
        mx="auto"
        maxW="100%"
        bg="white"
        overflow="hidden"
        backgroundImage={`url(${background})`}
        backgroundSize="80% auto"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        flex="1"
      >
        {/* Main Content */}
        
        <VStack
          position="absolute"
          top="55%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          justify="center"
          gap="1.5rem"
        >
          {/* Title */}
          <Text
            fontSize="2.5rem"
            fontWeight="extrabold"
            color="#0025a3"
            fontFamily="'DM Sans', sans-serif"
            textTransform="uppercase"
            letterSpacing="0.25rem"
            textAlign="center"
          >
            Harvest Mission Global
          </Text>

          <Image src={ripple} alt="Ripple" w="8rem" marginBottom={"2.5rem"}/>

          {/* CTA Buttons */}
          <HStack spacing="0.5rem" justify="center" w="100%" maxW="45rem">
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
              backdropBlur="15px"
              bgColor="rgba(226, 233, 255, 0.01)"
              px="1.875rem"
              py="1rem"
              h="6.4375rem"
              borderRadius="1.25rem"
              fontFamily="'DM Sans', sans-serif"
              fontSize="1.25rem"
              fontWeight="extrabold"
              flex="1"
              _hover={{
                bgColor: 'rgba(226, 233, 255, 0.05)',
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.5rem"
            >
              Austin <FiArrowRight />
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
              px="1.875rem"
              py="1rem"
              h="6.4375rem"
              borderRadius="1.25rem"
              fontFamily="'DM Sans', sans-serif"
              fontSize="1.25rem"
              fontWeight="extrabold"
              flex="1"
              _hover={{
                bgColor: 'rgba(226, 233, 255, 0.05)',
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.5rem"
            >
              Hong Kong <FiArrowRight />
            </Button>
          </HStack>

          {/* Main CTA Button */}
          <Button
            bg="linear-gradient(90deg, #0025A3 0%, #5D6FAC 100%)"
            color="white"
            borderRadius="1.25rem"
            px="0.75rem"
            py="0.375rem"
            h="6.4375rem"
            w="27.5rem"
            fontFamily="'DM Sans', sans-serif"
            backdropFilter="blur(15px)"
            border="1px solid"
            borderColor="#0025a3"
            _hover={{
              opacity: 0.9,
            }}
          >
            <VStack gap={1}>
              <Text fontSize="0.875rem" fontWeight="normal">
                Learn about our
              </Text>
              <Text fontSize="1.125rem" fontWeight="bold" textTransform="uppercase">
                10 Year Commitment
              </Text>
              <Text fontSize="0.875rem" fontWeight="normal">
                as a Global Family of Churches
              </Text>
            </VStack>
          </Button>
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        bg="#e0e8ff"
        py="0.25rem"
        px="0.5rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="0.25rem"
      >
        <Text
          fontSize="0.75rem"
          color="#0025a2"
          fontFamily="'DM Sans', sans-serif"
          whiteSpace="nowrap"
        >
          Contact us at admin@hmccglobal.org
        </Text>
        <Text
          fontSize="0.75rem"
          color="#555"
          fontFamily="'DM Sans', sans-serif"
        >
          |
        </Text>
        <Text
          fontSize="0.75rem"
          color="#555"
          fontFamily="'DM Sans', sans-serif"
          whiteSpace="nowrap"
        >
          © 1996-2026 Harvest Mission Global. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
