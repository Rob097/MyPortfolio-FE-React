import { Filters } from '@/models/criteria.model';
import { Diary } from './diary.model';
import { Education } from './education.model';
import { Experience } from './experience.model';
import { Skill } from './skill.model';

export class Story {
    id: number;
    entryDateTime: Date;
    title: string;
    description: string;
    isPrimaryStory: boolean;
    diary: Diary;
    educations?: Education[];
    experiences?: Experience[];
    skills?: Skill[];

    constructor(obj: any) {
        this.id = obj.id;
        this.entryDateTime = obj.entryDateTime;
        this.title = obj.title;
        this.description = obj.description;
        this.isPrimaryStory = obj.isPrimaryStory;
        this.diary = obj.diary;
        this.educations = obj.educations;
        this.experiences = obj.experiences;
        this.skills = obj.skills;
    }
}

export class StoryQ extends Filters {
    public static id = 'id';
    public static entryDateTime = 'entryDateTime';
    public static title = 'title';
    public static description = 'description';
    public static isPrimaryStory = 'isPrimaryStory';
    public static diaryId = 'diary.id';
}