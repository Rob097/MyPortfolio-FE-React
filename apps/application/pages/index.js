import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Index() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI - Next.js example
        </Typography>
        <LoadingButton loading className='ml-4'>Test</LoadingButton>
        <h1 className="text-blue-500">{t("helloWorld")}</h1>

        <Typography variant="subtitle1" color="text" mt={2}>Shot what able cold new the see hold. Friendly as an betrayed formerly he. Morning because as to society behaved moments</Typography>
        <Button variant="contained" color="dark" size="medium" sx={{ borderRadius: '50px' }}>Download CV</Button>
      </Box>
    </Container>
  );
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