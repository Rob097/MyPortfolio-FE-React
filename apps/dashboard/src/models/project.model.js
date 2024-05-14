const { Filters } = require('shared/utilities/criteria');

export class Project {
    id;
    createdAt;
    updatedAt;
    slug;
    userId;
    title;
    description;
    fromDate;
    toDate;
    mainStoryId;
    stories;
    skills;
    coverImage;
    status;

    constructor(obj) {
        this.id = obj.id;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
        this.slug = obj.slug;
        this.userId = obj.userId;
        this.title = obj.title;
        this.description = obj.description;
        this.fromDate = obj.fromDate;
        this.toDate = obj.toDate;
        this.mainStoryId = obj.mainStoryId;
        this.stories = obj.stories;
        this.skills = obj.skills;
        this.coverImage = obj.coverImage;
        this.status = obj.status;
    }
}

export class ProjectQ extends Filters {
    static id = 'id';
    static userId = 'user.id';
    static title = 'title';
    static fromDate = 'fromDate';
    static toDate = 'toDate';
    static skillName = 'skills.name';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}