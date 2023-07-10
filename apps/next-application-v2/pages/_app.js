import '@/styles/globals.css';
import { ThemeProvider } from "@mui/material";
import theme from "common-lib/assets/theme";
import { Suspense } from 'react';

export default function App({ Component, pageProps }) {
  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Suspense>
  )
}
