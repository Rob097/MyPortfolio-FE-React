import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getLang, setLang } from 'shared/i18n';
import { useTranslation } from 'react-i18next';
import itFlag from 'public/images/flags/IT.svg';
import usFlag from 'public/images/flags/US.svg';

const LanguageSelector = ({ isMobile }) => {
    const { t, i18n } = useTranslation("auth");

    function languageChengeHandler(event) {
        i18n.changeLanguage(event.target.value.toLowerCase());
        setLang(event.target.value);
    }

    return (
        <FormControl className={isMobile ? "mx-auto" : ""} style={isMobile ? { display: 'table' } : {}}>
            <Select
                labelId="language-selector"
                id="language-selector"
                value={getLang()}
                onChange={languageChengeHandler}
                autoWidth
            >
                <MenuItem value={"it"} style={{ marginBottom: '0.5rem' }}><span style={{ display: 'flex' }}><img src={itFlag} style={{ maxWidth: '25px', marginRight: '0.5rem', float: 'left' }} />Italiano</span></MenuItem>
                <MenuItem value={"en"} style={{ marginTop: '0.5rem' }}><span style={{ display: 'flex' }}><img src={usFlag} style={{ maxWidth: '25px', marginRight: '0.5rem', float: 'left' }} />English</span></MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageSelector;