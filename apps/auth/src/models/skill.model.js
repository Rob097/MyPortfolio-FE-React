const { Filters } = require('shared/utilities/criteria');

export class Skill {
    id;
    name;
    category;

    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.category = obj.category;
    }
}

export class SkillCategory {
    id;
    name;

    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
    }
}

export class UserSkill {
    userId;
    skill;
    isMain;
    orderId;

    constructor(obj) {
        this.userId = obj.userId;
        this.skill = obj.skill;
        this.isMain = obj.isMain ?? null;
        this.orderId = obj.orderId ?? null;
    }
}

export class SkillQ extends Filters {
    static id = 'id';
    static skillName = 'name';
}