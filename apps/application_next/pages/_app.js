
import { ThemeProvider } from "@mui/material";
import theme from "common-lib/assets/theme";
import { Suspense } from 'react';
import '../styles/globals.css';


/* 
import dynamic from "next/dynamic";
const AuthStoreProvider = dynamic(
  async () => {
    const { AuthStoreProvider } = await import("context/AuthStore");
    return ({ forwardedRef, ...props }) => <AuthStoreProvider ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
); */

function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback="loading">
      {/* <AuthStoreProvider> */}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      {/* </AuthStoreProvider> */}
    </Suspense>
  );
}

export default MyApp;
