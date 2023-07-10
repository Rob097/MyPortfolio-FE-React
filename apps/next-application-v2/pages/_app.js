import '@/styles/globals.css';
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import theme from "common-lib/assets/theme";
import "common-lib/assets/theme/styles.scss";
import Head from "next/head";
import createEmotionCache from "../components/createEmotionCache";


const clientSideEmotionCache = createEmotionCache();
export default function App({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} theme={theme} />
      </ThemeProvider>
    </CacheProvider>
  )
}