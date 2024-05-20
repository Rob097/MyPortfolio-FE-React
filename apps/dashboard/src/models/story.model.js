import { Filters } from '@/models/criteria.model';
import { BaseDto, SlugDto } from './baseDto.models';

export class Story extends SlugDto {
    diaryId;
    title;
    description;
    fromDate;
    toDate;
    projectId;
    orderInProject;
    educationId;
    orderInEducation;
    experienceId;
    orderInExperience;
    skills;
    relevantSections;

    constructor(obj) {
        super(obj);
        this.diaryId = obj.diaryId;
        this.title = obj.title;
        this.description = obj.description;
        this.fromDate = obj.fromDate;
        this.toDate = obj.toDate;
        this.projectId = obj.projectId;
        this.orderInProject = obj.orderInProject;
        this.educationId = obj.educationId;
        this.orderInEducation = obj.orderInEducation;
        this.experienceId = obj.experienceId;
        this.orderInExperience = obj.orderInExperience;
        this.skills = obj.skills;
        this.relevantSections = obj.relevantSections;
    }
}

export class RelevantSection extends BaseDto {
    title;
    description;
    orderInStory;

    constructor(obj) {
        super(obj);
        this.title = obj.title;
        this.description = obj.description;
        this.orderInStory = obj.orderInStory;
    }
}

export class StoryQ extends Filters {
    static id = 'id';
    static entryDateTime = 'entryDateTime';
    static title = 'title';
    static description = 'description';
    static diaryId = 'diary.id';
    static projectId = 'project.id';
    static educationId = 'education.id';
    static experienceId = 'experience.id';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}