import { Filters } from '@/models/criteria.model';
import { SlugDto } from './baseDto.models';
import { Skill } from './skill.model';
import { Story } from './story.model';

export class Education extends SlugDto {
    userId: number;
    field?: string;
    school?: string;
    degree?: string;
    grade?: number;
    description?: string;
    fromDate?: Date;
    toDate?: Date;
    mainStoryId?: number;
    stories?: Story[];
    skills?: Skill[];
    coverImage?: string;

    constructor(obj: any) {
        super(obj);
        this.userId = obj.userId;
        this.school = obj.school;
        this.degree = obj.degree;
        this.field = obj.field;
        this.grade = obj.grade;
        this.description = obj.description;
        this.fromDate = obj.fromDate;
        this.toDate = obj.toDate;
        this.mainStoryId = obj.mainStoryId;
        this.stories = obj.stories;
        this.skills = obj.skills;
        this.coverImage = obj.coverImage;
    }
}

export class EducationQ extends Filters {
    public static id = 'id';
    public static userId = 'user.id';
    public static school = 'school';
    public static degree = 'degree';
    public static field = 'field';
    public static grade = 'grade';
    public static description = 'description';
    public static fromDate = 'fromDate';
    public static toDate = 'toDate';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}