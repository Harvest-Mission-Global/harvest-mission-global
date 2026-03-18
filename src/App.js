import React from 'react';
import { Box, VStack, HStack, Text, Button } from '@chakra-ui/react';
import backgroundImage from './images/background.jpg';

function App() {
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
    >
      <VStack spacing={6} align="center">
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize="2.5rem"
          color="black"
          fontStyle="italic"
        >
          Welcome to
        </Text>
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize="3rem"
          fontWeight="bold"
          color="black"
          mb={8}
        >
          HARVEST MISSION GLOBAL
        </Text>
        <HStack spacing={6}>
          <Button
            as="a"
            href="https://www.atx.hmccglobal.org/"
            target="_blank"
            rel="noopener noreferrer"
            fontFamily="'DM Sans', sans-serif"
            fontWeight="bold"
            bg="#c3d2ff"
            color="black"
            px={8}
            py={2}
            fontSize="1.5rem"
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
            px={8}
            py={2}
            fontSize="1.5rem"
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
