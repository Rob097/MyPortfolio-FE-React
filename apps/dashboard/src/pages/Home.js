import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t, i18n } = useTranslation("dashboard");

    return (
        <h1>{t('home.welcome')}</h1>
    );
}

export default Home;