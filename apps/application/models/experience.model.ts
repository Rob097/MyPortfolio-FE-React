import { Filters } from '@/models/criteria.model';
import { Skill } from './skill.model';
import { User } from './user.model';
import { SlugDto } from './baseDto.models';
import { Story } from './story.model';

export class Experience extends SlugDto {
    userId: number;
    title: string;
    employmentType: string;
    companyName: string;
    location?: string;
    description?: string;
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
        this.employmentType = obj.employmentType;
        this.companyName = obj.companyName;
        this.location = obj.location;
        this.description = obj.description;
        this.fromDate = obj.fromDate;
        this.toDate = obj.toDate;
        this.mainStoryId = obj.mainStoryId;
        this.stories = obj.stories;
        this.skills = obj.skills;
        this.coverImage = obj.coverImage;
    }
    
}

export class ExperienceQ extends Filters {
    public static id = 'id';
    public static userId = 'user.id';
    public static title = 'title';
    public static employmentType = 'employmentType';
    public static companyName = 'companyName';
    public static location = 'location';
    public static description = 'description';
    public static fromDate = 'fromDate';
    public static toDate = 'toDate';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}