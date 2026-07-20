import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Spinner, Text, VStack, chakra } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

const SRC = 'https://hk.hmccglobal.org/10y-commitment?embed=1';
const EMBED_ORIGIN = 'https://hk.hmccglobal.org';
const EMBED_READY = 'hmcc-embed-ready';
const LOAD_TIMEOUT_MS = 15000;
const VERIFY_DELAY_MS = 300;

function clearTimer(ref) {
  if (ref.current) {
    clearTimeout(ref.current);
    ref.current = null;
  }
}

function isEmbedSuccess(objectEl) {
  try {
    return !objectEl.contentDocument;
  } catch {
    return true;
  }
}

function BackButton() {
  return (
    <Button
      asChild
      position="absolute"
      top={{ base: '1rem', md: '1.5rem' }}
      left={{ base: '1rem', md: '1.5rem' }}
      zIndex={1}
      bg="white"
      border="2px solid"
      borderColor="#0025a3"
      color="#0025a3"
      px={{ base: '1rem', md: '1.875rem' }}
      py={{ base: '0.5rem', md: '1rem' }}
      h="auto"
      borderRadius={{ base: '1rem', md: '1.25rem' }}
      fontFamily="'DM Sans', sans-serif"
      fontSize={{ base: '1rem', md: '1.25rem' }}
      fontWeight="extrabold"
      _hover={{ bg: '#0025a3', color: 'white' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="0.5rem"
    >
      <a href="#/">
        <FiArrowLeft /> Back
      </a>
    </Button>
  );
}

function SplashCard({ children }) {
  return (
    <VStack
      maxW="32rem"
      textAlign="center"
      gap="1.5rem"
      bg="white"
      border="2px solid"
      borderColor="#0025a3"
      borderRadius={{ base: '1rem', md: '1.25rem' }}
      px={{ base: '1.5rem', md: '2.5rem' }}
      py={{ base: '2rem', md: '3rem' }}
    >
      {children}
    </VStack>
  );
}

function LoadingSplash() {
  return (
    <Box
      position="absolute"
      inset={0}
      bg="#e0e8ff"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="1.5rem"
      zIndex={0}
    >
      <SplashCard>
        <Spinner
          size="lg"
          color="#0025a3"
          borderWidth="2px"
          css={{ '--spinner-track-color': '#e0e8ff' }}
        />
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize={{ base: '1rem', md: '1.125rem' }}
          fontWeight="extrabold"
          color="#0025a3"
          opacity={0.8}
        >
          Loading...
        </Text>
      </SplashCard>
    </Box>
  );
}

function ErrorSplash() {
  return (
    <Box
      position="relative"
      w="100%"
      minH="100vh"
      bg="#e0e8ff"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="1.5rem"
    >
      <BackButton />
      <SplashCard>
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize={{ base: '1.5rem', md: '2rem' }}
          fontWeight="extrabold"
          color="#0025a3"
          lineHeight="1.3"
        >
          The page you are looking for seems to be down at the moment
        </Text>
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize={{ base: '1rem', md: '1.125rem' }}
          color="#0025a3"
          opacity={0.8}
        >
          Please try again later, or return to the homepage.
        </Text>
      </SplashCard>
    </Box>
  );
}

export default function TenYearCommitment() {
  const [status, setStatus] = useState('loading');
  const [embedSrc, setEmbedSrc] = useState(null);
  const timeoutRef = useRef(null);
  const verifyTimeoutRef = useRef(null);
  const objectRef = useRef(null);

  useEffect(() => {
    if (!navigator.onLine) {
      setStatus('error');
      return;
    }

    setEmbedSrc(SRC);
    timeoutRef.current = setTimeout(() => {
      setEmbedSrc(null);
      setStatus((current) => (current === 'ready' ? 'ready' : 'error'));
    }, LOAD_TIMEOUT_MS);

    return () => clearTimer(timeoutRef);
  }, []);

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== EMBED_ORIGIN) return;
      if (event.data?.type !== EMBED_READY) return;

      clearTimer(timeoutRef);
      clearTimer(verifyTimeoutRef);
      setStatus((current) => (current === 'error' ? 'error' : 'ready'));
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const handleLoad = () => {
    clearTimer(verifyTimeoutRef);
    verifyTimeoutRef.current = setTimeout(() => {
      const objectEl = objectRef.current;
      if (!objectEl) return;

      if (isEmbedSuccess(objectEl)) {
        clearTimer(timeoutRef);
        setStatus((current) => (current === 'error' ? 'error' : 'ready'));
        return;
      }

      clearTimer(verifyTimeoutRef);
      setEmbedSrc(null);
      setStatus((current) => (current === 'ready' ? 'ready' : 'error'));
    }, VERIFY_DELAY_MS);
  };

  if (status === 'error') {
    return <ErrorSplash />;
  }

  return (
    <Box position="relative" w="100%" h="100vh" bg="white" overflow="hidden">
      <BackButton />
      {status === 'loading' && <LoadingSplash />}
      {embedSrc && (
        <chakra.object
          ref={objectRef}
          data={embedSrc}
          type="text/html"
          title="10 Year Commitment"
          w="100%"
          h="100vh"
          display={status === 'ready' ? 'block' : 'none'}
          onLoad={handleLoad}
        />
      )}
    </Box>
  );
}
