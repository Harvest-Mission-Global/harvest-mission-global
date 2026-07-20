import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/dm-sans';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import App from './App';

const system = createSystem(defaultConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
