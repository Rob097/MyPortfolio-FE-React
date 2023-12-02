import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from "next/router";
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter()
  useEffect(() => {
    router.push("/home", undefined, { shallow: true })
  }, [])
}

export async function getStaticProps(context) {
  // extract the locale identifier from the URL
  const { locale } = context

  return {
    props: {
      // pass the translation props to the page component
      ...(await serverSideTranslations(locale)),
    },
  }
}