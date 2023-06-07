import "./index.css";
import { useTranslation } from 'react-i18next';

const Header = ({ count = 0 }) => {

  const { t, i18n } = useTranslation("header");

  return (
    <header>
      <p className="text-3xl font-bold underline">Remote Header / count: {count}</p>
      <p>{t('header.welcome')}</p>
    </header>
  )
};

export default Header;