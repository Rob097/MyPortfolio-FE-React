import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import itFlag from "@rob097/common-lib/assets/images/flags/IT.svg";
import usFlag from "@rob097/common-lib/assets/images/flags/US.svg";
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

const defaultLanguage = 'en';

const LanguageSelector = ({ onChange, isMobile }) => {
    const { i18n } = useTranslation("common");
    const { language: currentLanguage } = i18n;
    const router = useRouter();
    const locales = router.locales ?? [currentLanguage];

    const languageNames = useMemo(() => {
        return new Intl.DisplayNames([currentLanguage ?? defaultLanguage], {
            type: 'language',
        });
    }, [currentLanguage]);

    const [value, setValue] = useState(i18n.language ?? defaultLanguage);

    const switchToLocale = useCallback(
        (locale) => {
            const path = router.asPath;

            return router.push(path, path, { locale });
        },
        [router]
    );

    const languageChanged = useCallback(
        async (event) => {
            // setTimeout(async () => {
            const locale = event.target.value;

            setValue(locale);
            localStorage.setItem("lang", locale);
            window.dispatchEvent(new Event("lang"));

            if (onChange) {
                onChange(locale);
            }

            await switchToLocale(locale);
            // }, 5000);
        },
        [switchToLocale, onChange]
    );
    
    return (
        <>
            <FormControl className={isMobile ? "mx-auto" : ""} style={isMobile ? { display: 'table' } : {}}>
                <Select
                    labelId="language-selector"
                    id="language-selector"
                    value={value}
                    onChange={languageChanged}
                    autoWidth
                    inputprops={{ MenuProps: { disableScrollLock: true } }}
                    size="small"
                >
                    {
                        locales.map((locale) => {
                            const label = capitalize(languageNames.of(locale) ?? locale);
                            const flag = locale.toUpperCase() === 'IT' ? itFlag : usFlag;

                            return <MenuItem key={locale} value={locale} style={{ marginBottom: '0.5rem' }}><span style={{ display: 'flex' }}><img src={flag.src} style={{ maxWidth: '25px', marginRight: '0.5rem', float: 'left' }} />{label}</span></MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </>
    );
}

function capitalize(lang) {
    return lang.slice(0, 1).toUpperCase() + lang.slice(1);
}

export default LanguageSelector;