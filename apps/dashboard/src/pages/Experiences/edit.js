import CreateOrEditEntity from '@/components/CreateOrEditEntity';
import { CustomCard, CustomCardContent, CustomCardHeader } from '@/components/Custom/CardComponents';
import { CustomDatePicker, CustomTextArea, CustomTextField } from '@/components/Custom/FormComponents';
import { EntityTypeEnum } from '@/models/categories.model';
import { EntitiesStatus } from "@/models/enums";
import { EmploymentTypeEnum } from '@/models/experience.model';
import { Receipt } from '@mui/icons-material';
import { Box, FormControl, FormControlLabel, FormGroup, Grid, MenuItem, Switch } from '@mui/material';
import moment from 'moment';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const EditExperience = () => {
    const { slug: entitySlug } = useParams();

    const defaultValues = {
        stories: [],
        skills: [],
        coverImage: '',
        title: '',
        employmentType: '',
        companyName: '',
        location: '',
        fromDate: null,
        toDate: null,
        description: '',
        status: EntitiesStatus.DRAFT
    };

    const myForm = useForm({
        defaultValues: defaultValues
    });

    // Completely reset the form when the entitySlug changes
    useEffect(() => {
        myForm.reset(defaultValues);
    }, [entitySlug]);

    return (
        <FormProvider {...myForm}>
            <CreateOrEditEntity
                entitiesType={EntityTypeEnum.EXPERIENCES}
            />
        </FormProvider>
    )
}
export default EditExperience;

// Custom fields for the entity Experience
export const ExperienceSpecificFields = () => {
    const { t } = useTranslation("dashboard");
    const myForm = useFormContext();

    return (
        <CustomCard>
            <CustomCardHeader
                title={
                    <Box className='w-full flex justify-between items-center'>
                        {t('entities.edit.general-information.title')}
                        <FormControl component="fieldset">
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value="start"
                                    control={
                                        <Controller
                                            name="status"
                                            control={myForm.control}
                                            render={({ field }) => (
                                                <Switch
                                                    {...field}
                                                    checked={field.value === EntitiesStatus.PUBLISHED}
                                                    onChange={(e) => field.onChange(e.target.checked ? EntitiesStatus.PUBLISHED : EntitiesStatus.DRAFT)}
                                                    color="primary"
                                                />
                                            )}
                                        />
                                    }
                                    label={t('labels.status.published')}
                                    labelPlacement="start"
                                />
                            </FormGroup>
                        </FormControl>
                    </Box>
                }
                avatar={
                    <Receipt color='primary' fontSize='large' />
                }
            />
            <CustomCardContent id="entity-specific-fields">

                <Grid container spacing={2} padding={2}>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={myForm.control}
                            name="title"
                            rules={{ required: t('entities.edit.general-information.fields.title.required') }}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    label={t('entities.edit.general-information.fields.title.label')}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={myForm.control}
                            name="employmentType"
                            rules={{ required: t('entities.edit.general-information.fields.employmentType.required') }}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    select
                                    label={t('entities.edit.general-information.fields.employmentType.label')}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                >
                                    <MenuItem value="" disabled> {t('entities.edit.general-information.fields.employmentType.select')} </MenuItem>
                                    {Object.values(EmploymentTypeEnum).map((value) => (
                                        <MenuItem key={value} value={value}>
                                            {t(`entities.edit.general-information.fields.employmentType.${value}`)}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={myForm.control}
                            name="companyName"
                            rules={{ required: t('entities.edit.general-information.fields.company.required') }}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    label={t('entities.edit.general-information.fields.company.label')}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={myForm.control}
                            name="location"
                            rules={{ required: t('entities.edit.general-information.fields.location.required') }}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    label={t('entities.edit.general-information.fields.location.label')}
                                    variant="outlined"
                                    fullWidth
                                    error={!!error}
                                    helperText={error?.message}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={myForm.control}
                            name="fromDate"
                            rules={{ required: t('entities.edit.general-information.fields.from-date.required') }}
                            defaultValue={null}
                            render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                    label={t('entities.edit.general-information.fields.from-date.label')}
                                    value={field.value || null}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date);
                                    }}
                                    maxDate={myForm.watch('toDate') ?? moment()}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: 'outlined',
                                            error: !!error,
                                            helperText: error?.message,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Controller
                            control={myForm.control}
                            name="toDate"
                            defaultValue={null}
                            render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                    label={t('entities.edit.general-information.fields.to-date.label')}
                                    value={field.value || null}
                                    inputRef={field.ref}
                                    onChange={(date) => {
                                        field.onChange(date);
                                    }}
                                    minDate={myForm.watch('fromDate') ?? null}
                                    maxDate={moment()}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: 'outlined',
                                            error: !!error,
                                            helperText: error?.message,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            control={myForm.control}
                            name="description"
                            rules={{ required: t('entities.edit.general-information.fields.description.required') }}
                            defaultValue=""
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextArea
                                    label={t('entities.edit.general-information.fields.description.label')}
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    value={field.value || ''}
                                    error={!!error}
                                    helperText={error?.message}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </CustomCardContent>
        </CustomCard>
    );
}