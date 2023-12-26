import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../builder-registry";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Define a function that fetches the Builder
// content for a given page
export const getStaticProps = async ({ params, locale }) => {
  // Fetch the builder content for the given page
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  // Return the page content as props
  return {
    props: {
      page: page || null,
      ...(await serverSideTranslations(locale))
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

// Define the Page component
export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // Get the current language:
  const { locale } = router;

  const isServer = typeof window === 'undefined'

  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing && !isServer ) {
    // redirect to /404 page
    router.push("/404");
  }

  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
        <meta name="description" content={page?.data?.description} />
        <meta name="keywords" content="Portfolio, Professionals, Engineers, Architects, Web Developer, Storyteller" />
        <meta name="author" content="Roberto Dellantonio"/>
        <meta name="robots" content="index, follow"/>
        <meta name="googlebot" content="index, follow"/>
      </Head>
      {/* Render the Builder page */}
      <BuilderComponent 
        model="page" 
        content={page || undefined}
        data={{
          lingua: locale
        }}
      />
    </>
  );
}
