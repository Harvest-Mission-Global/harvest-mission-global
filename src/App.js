import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import HmgDesktop from './pages/HmgDesktop';
import HmgMobile from './pages/HmgMobile';

function App() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box>
      {isMobile ? <HmgMobile /> : <HmgDesktop />}
    </Box>
  );
}

export default App;
