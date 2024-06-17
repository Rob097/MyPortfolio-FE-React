import ExpandableSection from '@/components/ExpandableSection';
import { displayMessages } from '@/components/alerts';
import NewSkill from '@/components/skills/NewSkill';
import SkillsSearchSelect from '@/components/skills/SkillsSearchSelect';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDashboardStore } from "shared/stores/DashboardStore";

const Skills = () => {
    const myForm = useFormContext();
    const [store, dispatch] = useDashboardStore();
    const { t } = useTranslation("dashboard");
    const userSkills = useMemo(() => store.user?.skills, [store.user?.skills]);
    const numberOfMain = 3;

    useEffect(() => {
        const existingSkills = userSkills ?? [];
        existingSkills.sort((a, b) => a.orderId - b.orderId);

        myForm.setValue('skills', existingSkills);
    }, [userSkills])

    function addNewSkill(value) {
        let newSkills = myForm.watch('skills') || [];

        // Check if the skill is already in the list
        if (newSkills.find(s => s?.skill?.id === value.id)) {
            displayMessages([{ text: t('skills.already-present'), level: 'info' }]);
            return;
        }

        const newSkill = {
            skill: value,
            isMain: newSkills.length < numberOfMain,
            orderId: newSkills.length + 1,
            userId: store.user.id
        }
        newSkills.push(newSkill);
        myForm.setValue('skills', newSkills);
    }

    return (
        <ExpandableSection
            mainTitle={t('user-profile.skills.main-title')}
            secondaryTitle={t('user-profile.skills.secondary-title')}
            badge={t('user-profile.skills.badge', { number: store.user.skills?.length ?? 0 })}
            info={t('user-profile.skills.info')}
            MainBody={<SkillsSearchSelect myForm={myForm} numberOfMain={numberOfMain} />}
            SecondaryBody={<NewSkill afterCreationAction={addNewSkill} />}
        />
    )
}

export default Skills;