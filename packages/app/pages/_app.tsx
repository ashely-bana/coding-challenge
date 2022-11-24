import { ChakraProvider } from '@chakra-ui/react';
// import { defaultTheme } from '@cosmology/react';

function CosmologyApp({ Component, pageProps }) {
  return (
    <ChakraProvider /*theme={defaultThe*/>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default CosmologyApp;
