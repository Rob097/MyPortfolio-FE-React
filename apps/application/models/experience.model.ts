import { Filters } from '@/models/criteria.model';
import { Skill } from './skill.model';
import { User } from './user.model';

export class Experience {
    id: number;
    user: User;
    title: string;
    employmentType: string;
    companyName: string;
    location?: string;
    startDate: Date;
    description?: string;
    skills?: Skill[];

    constructor(obj: any) {
        this.id = obj.id;
        this.user = obj.user;
        this.title = obj.title;
        this.employmentType = obj.employmentType;
        this.companyName = obj.companyName;
        this.location = obj.location;
        this.startDate = obj.startDate;
        this.description = obj.description;
        this.skills = obj.skills;
    }
}

export class ExperienceQ extends Filters {
    public static id = 'id';
    public static userId = 'user.id';
    public static title = 'title';
    public static employmentType = 'employmentType';
    public static companyName = 'companyName';
    public static location = 'location';
    public static startDate = 'startDate';
    public static description = 'description';
}