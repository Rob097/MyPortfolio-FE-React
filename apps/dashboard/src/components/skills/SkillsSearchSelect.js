import { displayMessages } from '@/components/alerts';
import { SkillQ } from '@/models/skill.model';
import { SkillService } from "@/services/skill.service";
import Search from '@mui/icons-material/Search';
import { Autocomplete, Chip, Divider, Grid, TextField, Tooltip } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { debounce } from '@mui/material/utils';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ShowIf from 'shared/components/ShowIf';
import { useDashboardStore } from "shared/stores/DashboardStore";
import { Criteria, Operation, View } from 'shared/utilities/criteria';

const SkillsSearchSelect = ({ myForm, numberOfMain }) => {
    const [store, dispatch] = useDashboardStore();
    const [searchedSkills, setSearchedSkills] = useState([]);
    const formSkills = myForm.watch('skills');

    useEffect(() => {
        fetchSkills();
    }, []);

    async function fetchSkills(query) {
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

    // Helper function to reorder the list
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        if (numberOfMain) {
            result.forEach((skill, index) => {
                skill.orderId = index + 1;
                skill.isMain = index < numberOfMain;
            });
        }

        return result;
    };

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        const skills = reorder(
            formSkills,
            result.source.index,
            result.destination.index
        );

        myForm.setValue('skills', skills);
    }

    useEffect(() => {
        onDragEnd.bind(this);
    }, [formSkills]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Autocomplete
                    id="skills"
                    options={searchedSkills}
                    getOptionLabel={(option) => option?.name}
                    onInputChange={debounce((e, value) => fetchSkills(value), 500)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search skills"
                            variant="outlined"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}
                    isOptionEqualToValue={(option, value) => option?.id === value?.id}
                    onChange={(e, value) => {
                        if (value) {
                            let newSkills = formSkills || [];

                            // Check if the skill is already in the list
                            if (newSkills.find(s => s?.skill?.id === value.id)) {
                                displayMessages([{ text: 'Skill già presente', level: 'info' }]);
                                return;
                            }

                            let newSkill = value;
                            if (numberOfMain) {
                                newSkill = {
                                    skill: value,
                                    isMain: newSkills.length < numberOfMain,
                                    orderId: newSkills.length + 1,
                                    userId: store.user.id
                                }
                            }
                            newSkills.push(newSkill);
                            myForm.setValue('skills', newSkills);
                        }
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={8} >

                {formSkills?.length <= 0 ? <p className="text-gray-500">Nessuna skill selezionata</p> :
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" direction="horizontal" className="flex-wrap">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex flex-wrap p-2 overflow-auto"
                                >
                                    {formSkills?.map((skill, index) => (
                                        <div key={`skill-main-div-${skill?.skill?.id}`} className='relative w-fit h-fit flex' >

                                            <ShowIf condition={numberOfMain != null && numberOfMain !== undefined && numberOfMain > 0 && index === numberOfMain}>
                                                <Divider key={'main-skills-divider'} orientation="vertical" variant="middle" flexItem className={snapshot.isDraggingOver ? 'hidden' : ''} />
                                            </ShowIf>

                                            <Draggable key={skill?.skill?.id} draggableId={'' + skill?.skill?.id} index={index} isDragDisabled={skill.orderId === undefined}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={provided.draggableProps.style}
                                                        key={`container-${skill?.skill?.id}`}
                                                        className="p-2 mx-2"
                                                    >
                                                        <Tooltip title={skill?.skill?.category?.name}>
                                                            <Chip
                                                                label={skill?.skill?.name}
                                                                className={(skill.orderId !== undefined ? '!cursor-grab' : '')}
                                                                onDelete={() => {
                                                                    let newSkills = formSkills?.filter((s, i) => i !== index);
                                                                    if (numberOfMain) {
                                                                        newSkills.forEach((skill, index) => {
                                                                            skill.orderId = index + 1;
                                                                            skill.isMain = index < numberOfMain;
                                                                        });
                                                                    }
                                                                    myForm.setValue('skills', newSkills);
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </div>
                                                )}
                                            </Draggable>
                                        </div>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                }

            </Grid>
        </Grid>
    )
}

export default SkillsSearchSelect;