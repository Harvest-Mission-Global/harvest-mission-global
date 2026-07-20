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

const locationBtnProps = {
  asChild: true,
  bg: 'transparent',
  border: '2px solid',
  borderColor: '#0025a3',
  color: '#0025a3',
  backdropFilter: 'blur(15px)',
  bgColor: 'rgba(226, 233, 255, 0.01)',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 'extrabold',
  _hover: { bg: '#0025a3', color: 'white' },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  px: { base: '0.375rem', md: '1.875rem' },
  py: { base: '0.25rem', md: '1rem' },
  h: { base: 'auto', md: '6.4375rem' },
  minH: { base: '3.75rem', md: undefined },
  w: { base: '70%', md: 'auto' },
  flex: { base: undefined, md: 1 },
  borderRadius: { base: '1rem', md: '1.25rem' },
  fontSize: { base: '1rem', md: '1.25rem' },
};

export default function HmgHome() {
  return (
    <Box bg="white" minH="100vh" display="flex" flexDirection="column">
      <Box
        position="relative"
        minH={{ base: '43.75rem', md: '45rem' }}
        h={{ base: undefined, md: '45rem' }}
        w={{ base: '100%', md: '90rem' }}
        mx="auto"
        maxW="100%"
        bg="white"
        overflow="hidden"
        px={{ base: '0.25rem', md: 0 }}
        backgroundImage={`url(${background})`}
        backgroundSize={{ base: 'cover', md: '80% auto' }}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        flex="1"
      >
        <VStack
          position="absolute"
          top={{ base: '50%', md: '55%' }}
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          justify="center"
          gap="1.5rem"
        >
          <Text
            fontSize={{ base: '1.5rem', md: '2.5rem' }}
            fontWeight="extrabold"
            color="#0025a3"
            fontFamily="'DM Sans', sans-serif"
            textTransform="uppercase"
            letterSpacing={{ base: '0.125rem', md: '0.25rem' }}
            textAlign="center"
          >
            Harvest Mission Global
          </Text>

          <Image src={ripple} alt="Ripple" w="8rem" marginBottom="2.5rem" />

          <HStack
            gap="0.5rem"
            justify="center"
            w="100%"
            maxW="45rem"
            flexDirection={{ base: 'column', md: 'row' }}
          >
            <Button {...locationBtnProps}>
              <a
                href="https://www.atx.hmccglobal.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Austin <FiArrowRight />
              </a>
            </Button>
            <Button {...locationBtnProps}>
              <a
                href="https://hk.hmccglobal.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hong Kong <FiArrowRight />
              </a>
            </Button>
          </HStack>

          <Button
            asChild
            bg="linear-gradient(90deg, #0025A3 0%, #5D6FAC 100%)"
            color="white"
            borderRadius={{ base: '1rem', md: '1.25rem' }}
            px="0.75rem"
            py="0.375rem"
            h={{ base: 'auto', md: '6.4375rem' }}
            minH={{ base: '5rem', md: undefined }}
            w={{ base: '70%', md: '27.5rem' }}
            maxW="27.5rem"
            fontFamily="'DM Sans', sans-serif"
            backdropFilter="blur(15px)"
            border="1px solid"
            borderColor="#0025a3"
            _hover={{ opacity: 0.9 }}
          >
            <a href="#/10y-commitment">
              <VStack gap={{ base: '0.005rem', md: 1 }}>
                <Text
                  fontSize={{ base: '0.75rem', md: '0.875rem' }}
                  fontWeight="normal"
                  display={{ base: 'none', md: 'block' }}
                >
                  Learn about our
                </Text>
                <Text
                  fontSize="0.75rem"
                  fontWeight="normal"
                  display={{ base: 'block', md: 'none' }}
                >
                  Learn more about our
                </Text>
                <Text
                  fontSize={{ base: '0.875rem', md: '1.125rem' }}
                  fontWeight="bold"
                  textTransform="uppercase"
                >
                  10 Year Commitment
                </Text>
                <Text
                  fontSize={{ base: '0.75rem', md: '0.875rem' }}
                  fontWeight="normal"
                >
                  as a Global Family of Churches
                </Text>
              </VStack>
            </a>
          </Button>
        </VStack>
      </Box>

      <Box
        bg="#e0e8ff"
        py="0.25rem"
        px={{ base: '0.25rem', md: '0.5rem' }}
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="center"
        alignItems="center"
        gap="0.25rem"
      >
        <Text
          fontSize="0.875rem"
          color="#0025a2"
          fontFamily="'DM Sans', sans-serif"
          whiteSpace="nowrap"
        >
          Contact us at admin@hmccglobal.org
        </Text>
        <Text
          fontSize="0.875rem"
          color="#555"
          fontFamily="'DM Sans', sans-serif"
          display={{ base: 'none', md: 'block' }}
        >
          |
        </Text>
        <Box
          display={{ base: 'block', md: 'none' }}
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
