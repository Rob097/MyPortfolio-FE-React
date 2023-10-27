import { Filters } from '@/models/criteria.model';
import { Diary } from './diary.model';
import { Skill } from './skill.model';
import { SlugDto } from './baseDto.models';

export class Story extends SlugDto {
    diaryId: number;
    title: string;
    description: string;
    fromDate: Date;
    toDate: Date;
    firstRelevantSection: string;
    secondRelevantSection: string;
    projectId: number;
    orderInProject: number;
    educationId: number;
    orderInEducation: number;
    experienceId: number;
    orderInExperience: number;
    skills?: Skill[];

    constructor(obj: any) {
        super(obj);
        this.diaryId = obj.diaryId;
        this.title = obj.title;
        this.description = obj.description;
        this.fromDate = obj.fromDate;
        this.firstRelevantSection = obj.firstRelevantSection;
        this.secondRelevantSection = obj.secondRelevantSection;
        this.toDate = obj.toDate;
        this.projectId = obj.projectId;
        this.orderInProject = obj.orderInProject;
        this.educationId = obj.educationId;
        this.orderInEducation = obj.orderInEducation;
        this.experienceId = obj.experienceId;
        this.orderInExperience = obj.orderInExperience;
        this.skills = obj.skills;
    }
}

export class StoryQ extends Filters {
    public static id = 'id';
    public static entryDateTime = 'entryDateTime';
    public static title = 'title';
    public static description = 'description';
    public static diaryId = 'diary.id';
    public static projectId = 'project.id';
    public static educationId = 'education.id';
    public static experienceId = 'experience.id';
}