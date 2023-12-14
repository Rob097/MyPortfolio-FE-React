import { Filters } from '@/models/criteria.model';
import { Story } from './story.model';
import { SlugDto } from './baseDto.models';
import { Skill } from './skill.model';

export class Project extends SlugDto {
    userId: number;
    title: string;
    description: string;
    fromDate: Date;
    toDate?: Date;
    mainStoryId?: number;
    stories?: Story[];
    skills?: Skill[];
    coverImage?: string;

    constructor(obj: any) {
        super(obj);
        this.userId = obj.userId;
        this.title = obj.title;
        this.description = obj.description;
        this.fromDate = obj.fromDate;
        this.toDate = obj.toDate;
        this.mainStoryId = obj.mainStoryId;
        this.stories = obj.stories;
        this.skills = obj.skills;
        this.coverImage = obj.coverImage;
    }
}

export class ProjectQ extends Filters {
    public static id = 'id';
    public static userId = 'user.id';
    public static title = 'title';
    public static entryDateTime = 'entryDateTime';
    public static skillName = 'skills.name';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}