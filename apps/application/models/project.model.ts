import { Filters } from '@/models/criteria.model';
import { Story } from './story.model';
import { User } from './user.model';

export class Project {
    id: number;
    title: string;
    description: string;
    entryDateTime: Date;
    user: User;
    stories?: Story[];
    skills?: any[];

    constructor(obj: any) {
        this.id = obj.id;
        this.title = obj.title;
        this.description = obj.description;
        this.entryDateTime = obj.entryDateTime;
        this.user = obj.user;
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