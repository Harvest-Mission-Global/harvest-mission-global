import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import background from '../images/BG_top.png';
import ripple from '../images/ripple.png';

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
        backgroundRepeat="no-repeat"
        flex="1"
      >
        {/* Main Content */}
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          justify="center"
          gap="1.5rem"
        >
          {/* Title */}
          <Text
            fontSize="1.5rem"
            fontWeight="extrabold"
            color="#0025a3"
            fontFamily="'DM Sans', sans-serif"
            textTransform="uppercase"
            letterSpacing="0.125rem"
            textAlign="center"
          >
            Harvest Mission Global
          </Text>

          <Image src={ripple} alt="Ripple" w="8rem" marginBottom={"2.5rem"}/>

          {/* CTA Buttons - Stacked on mobile */}
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
              w="70%"
              minH="3.75rem"
              borderRadius="1rem"
              fontFamily="'DM Sans', sans-serif"
              fontSize="1rem"
              fontWeight="extrabold"
              _hover={{
                bgColor: '#0025a3',
                color: 'white',
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
              px="0.375rem"
              py="0.25rem"
              h="auto"
              minH="3.75rem"
              borderRadius="1rem"
              fontFamily="'DM Sans', sans-serif"
              fontSize="1rem"
              fontWeight="extrabold"
              w="70%"
              _hover={{
                bgColor: '#0025a3',
                color: 'white',
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.5rem"
            >
              Hong Kong <FiArrowRight />
            </Button>

          {/* Main CTA Button */}
          {/* <Button
            bg="linear-gradient(90deg, #0025A3 0%, #5D6FAC 100%)"
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
            w="70%"
            maxW="27.5rem"
            _hover={{
              opacity: 0.9,
            }}
          >
            <VStack gap="0.005rem">
              <Text fontSize="0.75rem" fontWeight="normal">
                Learn more about our
              </Text>
              <Text fontSize="0.875rem" fontWeight="bold" textTransform="uppercase">
                10 Year Commitment
              </Text>
              <Text fontSize="0.75rem" fontWeight="normal">
                as a global family of churches
              </Text>
            </VStack>
          </Button> */}
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        bg="#e0e8ff"
        py="0.25rem"
        px="0.25rem"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={"0.25rem"}
      >
        <Text
          fontSize="0.875rem"
          color="#0025a2"
          fontFamily="'DM Sans', sans-serif"
          whiteSpace="nowrap"
        >
          Contact us at admin@hmccglobal.org
        </Text>
        <Box
          w="0.875rem"
          h="1px"
          bg="#B1BEE9"
        />
        <Text
          fontSize="0.875rem"
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
