import createEmotionCache from '@/components/createEmotionCache';
import CoverLayout from '@/components/layouts/CoverLayout';
import '@/styles/globals.scss';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@rob097/common-lib/assets/theme";
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import PropTypes from 'prop-types';
import * as React from 'react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CoverLayout>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </CoverLayout>
      </ThemeProvider>
    </CacheProvider>
  );
}

const SuspApp = (props) => {
  return <React.Suspense fallback={<div>Loading...</div>}><MyApp {...props} /></React.Suspense>
}

export default appWithTranslation(SuspApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
