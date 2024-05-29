import { SkillQ } from '@/models/skill.model';
import { SkillService } from "@/services/skill.service";
import { Autocomplete, Box, TextField, Tooltip } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Criteria, Operation, View } from 'shared/utilities/criteria';

const SkillsSearchSelect = ({ myForm, numberOfMain }) => {
    const [searchedSkills, setSearchedSkills] = useState([]);
    const formSkills = myForm.watch('skills', []);
    const { t } = useTranslation("dashboard");
    const [searchedText, setSearchedText] = useState('');

    async function fetchSkills(query) {
        setSearchedText(query);
        const skillName = new Criteria(SkillQ.skillName, Operation.equals, "*" + query?.replace(" ", "*") + "*");

        const criterias = query ? [skillName] : null;
        const filters = new SkillQ(criterias, View.verbose, 0, 5, null);
        SkillService.getByCriteria(filters).then((response) => {
            const skills = response?.content;
            setSearchedSkills(skills);
        }).catch((error) => {
            console.error(error);
        });
    }

    const checkDisable = useCallback((option) => {
        return formSkills && formSkills?.length >= numberOfMain;
    }, [formSkills, numberOfMain]);


    return (
        <Box className="w-full">
            <Autocomplete
                id="skills"
                multiple
                fullWidth
                limitTags={numberOfMain}
                getOptionDisabled={checkDisable}
                options={searchedSkills}
                getOptionLabel={(option) => option?.name}
                onInputChange={debounce((e, value) => fetchSkills(value), 500)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        label={t('skills.search')}
                        variant="outlined"
                    />
                )}
                renderOption={(props, option) => (
                    <Tooltip title={option?.category?.name} key={'tooltip-' + option?.id}>
                        <li {...props} key={'li-' + option?.id}>
                            {option.name}
                        </li>
                    </Tooltip>
                )}
                noOptionsText={searchedText ? t('skills.no-skill-found') : t('skills.start-typing')}
                isOptionEqualToValue={(option, value) => { return option && value && option?.id === value?.id; }}
                onChange={(e, value) => {
                    myForm.setValue('skills', value);
                }}
            />
        </Box>
    )
}

export default SkillsSearchSelect;