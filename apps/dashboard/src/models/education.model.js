const { Filters } = require('shared/utilities/criteria');

export class Education {
    id;
    createdAt;
    updatedAt;
    slug;
    userId;
    field;
    school;
    degree;
    grade;
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
        this.status = obj.status;
    }
}

export class EducationQ extends Filters {
    static id = 'id';
    static userId = 'user.id';
    static school = 'school';
    static degree = 'degree';
    static field = 'field';
    static grade = 'grade';
    static description = 'description';
    static fromDate = 'fromDate';
    static toDate = 'toDate';
    static slug = 'slug';
    static createdAt = 'createdAt';
    static updatedAt = 'updatedAt';
}