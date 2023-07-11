import { setLang } from '@/public/locales/i18n';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import itFlag from "common-lib/assets/images/flags/IT.svg";
import usFlag from "common-lib/assets/images/flags/US.svg";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = ({ isMobile }) => {
    const { t, i18n } = useTranslation("common");
    const [langState, setLangState] = useState('en');

    function languageChengeHandler(event) {
        i18n.changeLanguage(event.target.value.toLowerCase());
        setLang(event.target.value);
    }

    useEffect(() => {
        if (i18n.resolvedLanguage) {
            setLangState(i18n.resolvedLanguage);
        }
    }, [i18n.resolvedLanguage]);

    return (
        <FormControl className={isMobile ? "mx-auto" : ""} style={isMobile ? { display: 'table' } : {}}>
            <Select
                labelId="language-selector"
                id="language-selector"
                value={langState}
                onChange={languageChengeHandler}
                autoWidth
            >
                <MenuItem value={"it"} style={{ marginBottom: '0.5rem' }}><span style={{ display: 'flex' }}><img src={itFlag.src} style={{ maxWidth: '25px', marginRight: '0.5rem', float: 'left' }} />{t('ita')}</span></MenuItem>
                <MenuItem value={"en"} style={{ marginTop: '0.5rem' }}><span style={{ display: 'flex' }}><img src={usFlag.src} style={{ maxWidth: '25px', marginRight: '0.5rem', float: 'left' }} />English</span></MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageSelector;