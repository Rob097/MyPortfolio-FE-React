import { Filters } from '@rob097/common-lib/criteria.model';
import { Story } from './story.model';
import { User } from './user.model';

export class Education {
    id: number;
    user: User;
    school?: string;
    degree?: string;
    field?: string;
    startDate: Date;
    grade?: number;
    description?: string;
    stories?: Story[];

    constructor(obj: any) {
        this.id = obj.id;
        this.user = obj.user;
        this.school = obj.school;
        this.degree = obj.degree;
        this.field = obj.field;
        this.startDate = obj.startDate;
        this.grade = obj.grade;
        this.description = obj.description;
        this.stories = obj.stories;
    }
}

export class EducationQ extends Filters {
    public static id = 'id';
    public static userId = 'user.id';
    public static school = 'school';
    public static degree = 'degree';
    public static field = 'field';
    public static startDate = 'startDate';
    public static grade = 'grade';
    public static description = 'description';
}