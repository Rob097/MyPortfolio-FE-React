import { ThemeProvider } from "@mui/material";
import theme from "common-lib/assets/theme";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import '../styles/globals.css';
const SoftUIControllerProvider = dynamic(
  async () => {
    const { SoftUIControllerProvider } = await import("context/DashboardStore");
    return ({ forwardedRef, ...props }) => <SoftUIControllerProvider ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);
const StoreProvider = dynamic(
  async () => {
    const { StoreProvider } = await import("context/Store");
    return ({ forwardedRef, ...props }) => <StoreProvider ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);
const AuthStoreProvider = dynamic(
  async () => {
    const { AuthStoreProvider } = await import("context/AuthStore");
    return ({ forwardedRef, ...props }) => <AuthStoreProvider ref={forwardedRef} {...props} />;
  },
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  return (
    <Suspense fallback={'loading'}>
      {/* Theme providers */}
      <SoftUIControllerProvider>
        <ThemeProvider theme={theme}>

          {/* Store providers */}
          <StoreProvider>
            <AuthStoreProvider>

              {/* Routes */}
              <Component {...pageProps} />

            </AuthStoreProvider>
          </StoreProvider>

        </ThemeProvider>
      </SoftUIControllerProvider>
      <h1>Prova</h1>
    </Suspense>
  );
}

export default MyApp;
