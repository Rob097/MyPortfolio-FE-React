import { Filters } from '@/models/criteria.model';
import { Story } from './story.model';
import { SlugDto } from './baseDto.models';
import { Skill } from './skill.model';

export class Project extends SlugDto {
    userId: number;
    title: string;
    description: string;
    mainStoryId?: number;
    stories?: Story[];
    skills?: Skill[];

    constructor(obj: any) {
        super(obj);
        this.userId = obj.userId;
        this.title = obj.title;
        this.description = obj.description;
        this.mainStoryId = obj.mainStoryId;
        this.stories = obj.stories;
        this.skills = obj.skills;
    }
}

export class ProjectQ extends Filters {
    public static id = 'id';
    public static userId = 'user.id';
    public static title = 'title';
    public static entryDateTime = 'entryDateTime';
    public static skillName = 'skills.name';
}