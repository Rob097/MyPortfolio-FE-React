import CreateOrEditEntity from '@/components/CreateOrEditEntity';
import { CustomCard, CustomCardContent, CustomCardHeader } from '@/components/Custom/CardComponents';
import { CustomDatePicker, CustomTextArea, CustomTextField } from '@/components/Custom/FormComponents';
import { EntityTypeEnum } from '@/models/categories.model';
import { EntitiesStatus } from "@/models/enums";
import { Receipt } from '@mui/icons-material';
import { Box, FormControl, FormControlLabel, FormGroup, Grid, Switch } from '@mui/material';
import moment from 'moment';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const EditProject = () => {

    const defaultValues = {
        stories: [],
        skills: [],
        coverImage: '',
        title: '',
        fromDate: null,
        toDate: null,
        description: '',
        status: EntitiesStatus.DRAFT
    };

    const myForm = useForm({
        defaultValues: defaultValues
    });

    return (
        <FormProvider {...myForm}>
            <CreateOrEditEntity
                entitiesType={EntityTypeEnum.PROJECTS}
            />
        </FormProvider>
    )
}
export default EditProject;

// Custom fields for the entity Project
export const ProjectSpecificFields = () => {
    const { t } = useTranslation("dashboard");
    const myForm = useFormContext();

    return (
        <CustomCard>
            <CustomCardHeader
                title={
                    <Box className='w-full flex justify-between items-center'>
                        General Informations
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
                                    label="Published"
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
                    <Grid item xs={12}>
                        <Controller
                            control={myForm.control}
                            name="title"
                            rules={{ required: t('Title is required') }}
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextField
                                    label={t('Title')}
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
                            rules={{ required: t('From Date is required') }}
                            render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                    label={t('From Date')}
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
                            render={({ field, fieldState: { error } }) => (
                                <CustomDatePicker
                                    label={t('To Date')}
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
                            rules={{ required: t('Description is required') }}
                            render={({ field, fieldState: { error } }) => (
                                <CustomTextArea
                                    label={t('Description')}
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