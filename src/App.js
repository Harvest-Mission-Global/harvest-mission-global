import React from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HmgDesktop from './pages/HmgDesktop';
import HmgMobile from './pages/HmgMobile';
import TenYearCommitment from './pages/TenYearCommitment';

function Home() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box>
      {isMobile ? <HmgMobile /> : <HmgDesktop />}
    </Box>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/10y-commitment" element={<TenYearCommitment />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
