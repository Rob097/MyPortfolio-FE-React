import ShowIf from "@/components/utils/showIf";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Button, Container, Link, Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useMemo } from "react";

const Support = () => {
    const router = useRouter();
    const { t, i18n } = useTranslation();

    const currentLanguage = useMemo(() => i18n.language, [i18n.language]);
    const user = useMemo(() => router.query.user ? JSON.parse(router.query.user) : null, [router.query.user]);

    return (
        <>
            {currentLanguage === 'en' && <EnglishPage user={user} />}
            {currentLanguage === 'it' && <ItalianPage user={user} />}
        </>
    );
};

export default Support;

export async function getStaticProps(context) {
    const { locale } = context
    const props = {
        ...(await serverSideTranslations(locale))
    }

    return {
        props
    }

}

const EnglishPage = ({ user }) => {
    return (
        <>

            <Head>
                <title>MyPortfolio - Support Us</title>
                <meta name="description" content="Support MyPortfolio and help us build the best portfolio platform ever!" />
                <meta name="keywords" content="MyPortfolio, support, support us, support form" />
                <meta name="author" content="Roberto Dellantonio" />
                <meta name="robots" content="index, follow" />
                <meta name="Googlebot" content="index, follow" />
            </Head>

            <Container maxWidth="2xl" className="flex flex-col justify-center items-center px-16 pt-12 max-md:px-5 w-full">
                <Typography
                    variant="h1"
                    className="text-center text-6xl text-black leading-[84px] max-md:max-w-full max-md:text-4xl max-md:leading-[58px]"
                >
                    Help Us Build
                    <span className="text-primary-main"> MyPortfolio</span>
                    :
                </Typography>
                <Typography
                    variant="h2"
                    className="text-center text-5xl text-black leading-[84px] max-md:max-w-full max-md:text-4xl max-md:leading-[58px]"
                >
                    Your Support Matters!
                </Typography>
                <ShowIf condition={user?.firstName !== undefined}>
                    <Typography
                        variant="h5"
                        className="flex flex-col sm:flex-row items-center sm:items-baseline text-center text-xl text-success-main mt-10 w-fit"

                    >
                        <img src="/images/party-popper.png" className="w-10 h-10 inline-block mr-2" />
                        Registration Completed!
                    </Typography>
                </ShowIf>
            </Container>
            <Container maxWidth="xl" className="flex flex-col justify-center items-center px-16 pb-12 max-md:px-5 w-full">
                <Typography
                    variant="body1"
                    component="div"
                    className="text-primary-main text-lg leading-7 mt-24 max-md:max-w-full max-md:mt-10"
                >
                    <span className="font-bold text-black">
                        Hello {user?.firstName ? user?.firstName : "Future MyPortfolio User"}, <br />
                    </span>
                    <span className=" text-black">
                        <br /> I'm thrilled to see your interest in MyPortfolio, a project
                        I've been passionately working on. As a solo founder, building a
                        platform that truly meets your needs is my top priority. <br /> <br />
                    </span>
                    <span className="font-bold text-primary-main"> Our Current Status: <br /></span>
                    <span className=" text-black">
                        MyPortfolio is still in development, and while I'm making great
                        strides, there's still work to be done. I believe in transparency, and
                        I want you to know that your patience and enthusiasm mean the world to
                        me. <br /> <br />
                    </span>
                    <span className="font-bold text-primary-main"> A Solo Endeavor: <br /></span>
                    <span className=" text-black">
                        As a one-person company, each step of this journey is both exciting
                        and challenging. I'm dedicated to delivering a product that exceeds
                        expectations, and I'm pouring my heart into every line of code. <br />
                        <br />
                    </span>
                    <span className="font-bold text-primary-main">
                        Your Chance to Make a Difference: <br />
                    </span>
                    <span className=" text-black">
                        If you're as excited about MyPortfolio as I am and would like to see
                        it come to life sooner, here's your chance to make a difference. I'm
                        gratefully accepting donations to support the development and hasten
                        the launch. <br /> <br />
                    </span>
                    <span className="font-bold text-primary-main">
                        What Your Donation Means: <br />
                    </span>
                    <span className=" text-black">
                        <br /> Funds will go directly into speeding up development and adding
                        valuable features. <br /> You'll receive exclusive updates on the
                        progress of MyPortfolio. <br /> Your generosity will be acknowledged
                        within the MyPortfolio community. <br /> How to Contribute: <br /> Click
                        the button below to make a secure donation. Every contribution, no
                        matter the size, is a step closer to the full launch of MyPortfolio.
                    </span>
                </Typography>
                <Link href="https://donate.stripe.com/cN26pZ2effCfgj6288" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                        variant="contained"
                        color="primary"
                        className="relative shrink-0 box-border appearance-none text-[white] rounded text-center cursor-pointer mt-5 px-6 py-4 w-full"
                        openLinkInNewTab={false}
                        startIcon={<VolunteerActivismIcon fontSize='large' />}
                    >
                        Donate now!
                    </Button>
                </Link>
                <img src="/images/stripe.png" className="w-12" />
                <Typography
                    variant="body1"
                    component="div"
                    className="text-primary-main text-lg leading-7 mt-6 max-md:max-w-full max-md:mt-10"
                >
                    <span className="font-bold text-primary-main">
                        Thank You for Your Support: <br />
                    </span>
                    <span className=" text-black">
                        Whether you choose to contribute or simply wait for the full release,
                        I want to express my deepest gratitude for being part of this journey.
                        I will also send you an email as soon as the platform will be ready!{" "}
                        <br /> Together, we're shaping MyPortfolio into something truly
                        remarkable. <br /> <br /> Warm regards, <br /> Roberto <br /> Founder of
                        MyPortfolio
                    </span>
                </Typography>
            </Container>
        </>
    );
}

const ItalianPage = ({ user }) => {
    return (
        <>

            <Head>
                <title>MyPortfolio | Supportaci</title>
                <meta name="description" content="Supporta MyPortfolio e aiutaci a costruire la migliore piattaforma di portfolio mai creata!" />
                <meta name="keywords" content="MyPortfolio, support, support us, support form" />
                <meta name="author" content="Roberto Dellantonio" />
                <meta name="robots" content="index, follow" />
                <meta name="Googlebot" content="index, follow" />
            </Head>

            <Container maxWidth="2xl" className="flex flex-col justify-center items-center px-16 pt-12 max-md:px-5 w-full">
                <Typography
                    variant="h1"
                    className="text-center text-6xl text-black leading-[84px] max-md:max-w-full max-md:text-4xl max-md:leading-[58px]"
                >
                    Aiutaci a Costruire
                    <span className="text-primary-main"> MyPortfolio</span>
                    :
                </Typography>
                <Typography
                    variant="h2"
                    className="text-center text-5xl text-black leading-[84px] max-md:max-w-full max-md:text-4xl max-md:leading-[58px]"
                >
                    Il Tuo Supporto è Importante!
                </Typography>
                <ShowIf condition={user?.firstName !== undefined}>
                    <Typography
                        variant="h5"
                        className="flex flex-col sm:flex-row items-center sm:items-baseline text-center text-xl text-success-main mt-10 w-fit"

                    >
                        <img src="/images/party-popper.png" className="w-10 h-10 inline-block mr-2" />
                        Registrazione Completata!
                    </Typography>
                </ShowIf>
            </Container>
            <Container maxWidth="xl" className="flex flex-col justify-center items-center px-16 pb-12 max-md:px-5 w-full">
                <Typography
                    variant="body1"
                    component="div"
                    className="text-primary-main text-lg leading-7 mt-24 max-md:max-w-full max-md:mt-10"
                >
                    <span className="font-bold text-black">
                        Ciao {user?.firstName ? user?.firstName : "Futuro Utente di MyPortfolio"}, <br />
                    </span>
                    <span className=" text-black">
                        <br /> Sono entusiasta di vedere il tuo interesse per MyPortfolio, un progetto
                        a cui sto lavorando con passione. Come fondatore unico, costruire una
                        piattaforma che soddisfi veramente le tue esigenze è la mia massima priorità. <br /> <br />
                    </span>
                    <span className="font-bold text-primary-main"> La Situazione Attuale: <br /></span>
                    <span className=" text-black">
                        MyPortfolio è ancora in fase di sviluppo e, mentre faccio grandi progressi,
                        c'è ancora lavoro da fare. Credo nella trasparenza e voglio che tu sappia che
                        la tua pazienza e il tuo entusiasmo significano il mondo per me. <br /> <br />
                    </span>
                    <span className="font-bold text-primary-main"> Un Impegno Individuale: <br /></span>
                    <span className=" text-black">
                        Come singolo fondatore, ogni passo di questo viaggio è sia eccitante
                        che impegnativo. Sono dedicato a fornire un prodotto che superi le aspettative,
                        e sto mettendo il cuore in ogni riga di codice. <br />
                        <br />
                    </span>
                    <span className="font-bold text-primary-main">
                        La Tua Opportunità di Fare la Differenza: <br />
                    </span>
                    <span className=" text-black">
                        Se sei entusiasta di MyPortfolio quanto lo sono io e vuoi vederlo prendere vita prima,
                        ecco la tua opportunità di fare la differenza. Accetto con gratitudine le donazioni per
                        sostenere lo sviluppo e accelerare il lancio. <br /> <br />
                    </span>
                    <span className="font-bold text-primary-main">
                        Cosa Significa la Tua Donazione: <br />
                    </span>
                    <span className=" text-black">
                        <br /> I fondi verranno utilizzati per velocizzare lo sviluppo e ad aggiungere
                        funzionalità preziose. <br /> Riceverai aggiornamenti esclusivi sui progressi di MyPortfolio. <br />
                        La tua generosità sarà riconosciuta all'interno della comunità di MyPortfolio. <br /> Come Contribuire: <br />
                        Clicca il pulsante qui sotto per effettuare una donazione sicura. Ogni contributo, indipendentemente dall'importo,
                        è un passo più vicino al lancio completo di MyPortfolio.
                    </span>
                </Typography>
                <Link href="https://donate.stripe.com/cN26pZ2effCfgj6288" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                        variant="contained"
                        color="primary"
                        className="relative shrink-0 box-border appearance-none text-[white] rounded text-center cursor-pointer mt-5 px-6 py-4 w-full"
                        openLinkInNewTab={false}
                        startIcon={<VolunteerActivismIcon fontSize='large' />}
                    >
                        Dona ora!
                    </Button>
                </Link>
                <img src="/images/stripe.png" className="w-12" />
                <Typography
                    variant="body1"
                    component="div"
                    className="text-primary-main text-lg leading-7 mt-6 max-md:max-w-full max-md:mt-10"
                >
                    <span className="font-bold text-primary-main">
                        Grazie per il Tuo Supporto: <br />
                    </span>
                    <span className=" text-black">
                        Che tu scelga di contribuire o semplicemente aspettare il rilascio completo,
                        voglio esprimere la mia più profonda gratitudine per far parte di questo viaggio.
                        Ti invierò anche una e-mail non appena la piattaforma sarà pronta! <br /> Insieme, stiamo plasmando MyPortfolio in qualcosa di veramente notevole. <br />
                        <br /> Un caro saluto, <br /> Roberto <br /> Fondatore di MyPortfolio
                    </span>
                </Typography>
            </Container>
        </>
    );
}
