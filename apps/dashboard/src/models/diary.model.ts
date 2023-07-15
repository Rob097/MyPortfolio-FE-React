import { Filters } from 'common-new/criteria.model';
import { Story } from './story.model';
import { User } from './user.model';

export class Diary {
    id: number;
    entryDateTime: Date;
    user?: User;
    stories?: Story[];

    constructor(obj: any) {
        this.id = obj.id;
        this.entryDateTime = obj.entryDateTime;
        this.user = obj.user;
        this.stories = obj.stories;
    }
}

export class DiaryQ extends Filters {
    public static id = 'id';
    public static entryDateTime = 'entryDateTime';
    public static userId = 'user.id';
}