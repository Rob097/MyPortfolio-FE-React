import theme from "@/MUI/theme";
import { CustomSnackProvider, SnackbarUtilsConfigurator, displayMessages } from "@/components/alerts/snack";
import createEmotionCache from '@/components/utils/createEmotionCache';
import ErrorHandler from '@/components/utils/errorHandler';
import Loading from "@/components/utils/loading/loading";
import CoverLayout from '@/layouts/CoverLayout';
import '@/styles/animations.scss';
import '@/styles/globals.scss';
import { StateProvider } from '@/utilities/globalState';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from "next/script";
import PropTypes from 'prop-types';
import { Suspense } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import { SWRConfig } from 'swr';
import Custom500 from './500';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  return (
    <Suspense fallback={<Loading />}>
      <CustomSnackProvider>
        <StateProvider>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <ErrorBoundary FallbackComponent={ErrorHandler} key={router.pathname}>

                <Head>
                  <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>

                <SnackbarUtilsConfigurator />
                <SWRConfig value={{ fallback: pageProps.fallback }}>
                  <Layout Component={Component} pageProps={pageProps} />
                </SWRConfig>

                <Analytics />
                <SpeedInsights />
                <GoogleAnalytics />

              </ErrorBoundary>
            </ThemeProvider>
          </CacheProvider>
        </StateProvider>
      </CustomSnackProvider>
    </Suspense>
  );
}

const Layout = ({ Component, pageProps }) => {

  const router = useRouter();
  if (router.isFallback) return <Loading />

  let content = PagesCommonLogics(pageProps);
  if (!content) {
    if (Component.getLayout) {
      content = Component.getLayout(<Component {...pageProps} />);
    } else {
      content = <Component {...pageProps} />;
    }
  }

  // check if route is "/editor":
  if (router.pathname === '/editor') {
    return content;
  }

  return <CoverLayout>{content}</CoverLayout>
};

const PagesCommonLogics = (pageProps) => {
  let content;
  if (pageProps.messages) {
    displayMessages(pageProps.messages);
  }
  if (pageProps?.error) {
    content = <Custom500 error={pageProps.error} {...pageProps} />
  }
  return content;
}

export default appWithTranslation(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

const GoogleAnalytics = () => (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
    <Script id="google-analytics">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
    </Script>
  </>
);