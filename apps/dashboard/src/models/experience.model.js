const { Filters } = require('shared/utilities/criteria');

export class Experience {
    id;
    createdAt;
    updatedAt;
    slug;
    userId;
    title;
    employmentType;
    companyName;
    location;
    description;
    fromDate;
    toDate;
    mainStoryId;
    stories;
    skills;
    coverImage;

    constructor(obj) {
        this.id = obj.id;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
        this.slug = obj.slug;
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
    static id = 'id';
    static userId = 'user.id';
    static title = 'title';
    static employmentType = 'employmentType';
    static companyName = 'companyName';
    static location = 'location';
    static description = 'description';
    static fromDate = 'fromDate';
    static toDate = 'toDate';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}