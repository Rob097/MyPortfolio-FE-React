import { Filters } from '@/models/criteria.model';
import { AuditableDto } from './baseDto.models';
import { Story } from './story.model';

export class Diary extends AuditableDto {
    userId?: number;
    title?: string;
    description?: string;
    isMain?: boolean;
    mainStoryId?: number;
    stories?: Story[];

    constructor(obj: any) {
        super(obj);
        this.userId = obj.userId;
        this.title = obj.title;
        this.description = obj.description;
        this.isMain = obj.isMain;
        this.mainStoryId = obj.mainStoryId;
        this.stories = obj.stories;
    }
}

export class DiaryQ extends Filters {
    public static id = 'id';
    public static userId = 'user.id';
    public static title = 'title';
    public static isMain = 'isMain';
    public static createdAt = 'createdAt';
}