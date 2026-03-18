import React from 'react';
import { Box, VStack, HStack, Text, Button, useBreakpointValue } from '@chakra-ui/react';
import backgroundImage from './images/background.jpg';

function App() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={{ base: 4, md: 0 }}
    >
      <VStack spacing={6} align="center" width="100%">
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize={{ base: '1.8rem', md: '2.5rem' }}
          color="black"
          fontStyle="italic"
          textAlign="center"
        >
          Welcome to
        </Text>
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize={{ base: '2rem', md: '3rem' }}
          fontWeight="bold"
          color="black"
          mb={8}
          textAlign="center"
        >
          HARVEST MISSION GLOBAL
        </Text>
        <HStack spacing={{ base: 3, md: 6 }} justify="center" width="100%" flexWrap={isMobile ? 'wrap' : 'nowrap'}>
          <Button
            as="a"
            href="https://www.atx.hmccglobal.org/"
            target="_blank"
            rel="noopener noreferrer"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="bold"
            bg="#c3d2ff"
            color="black"
            px={{ base: 6, md: 8 }}
            py={2}
            fontSize={{ base: '1rem', md: '1.5rem' }}
            border="none"
            borderRadius="20px"
            boxShadow="0 2px 4px rgba(0,0,0,0.2)"
            textDecoration="none"
            _hover={{
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              textDecoration: 'none',
            }}
          >
            Austin
          </Button>
          <Button
            as="a"
            href="https://hk.hmccglobal.org/"
            target="_blank"
            rel="noopener noreferrer"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="bold"
            bg="#c3d2ff"
            color="black"
            px={{ base: 6, md: 8 }}
            py={2}
            fontSize={{ base: '1rem', md: '1.5rem' }}
            border="none"
            borderRadius="20px"
            boxShadow="0 2px 4px rgba(0,0,0,0.2)"
            textDecoration="none"
            _hover={{
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              textDecoration: 'none',
            }}
          >
            Hong Kong
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default App;
