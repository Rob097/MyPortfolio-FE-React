import { Filters } from '@/models/criteria.model';
import { BaseDto } from './baseDto.models';

export class Skill extends BaseDto {
    name: string;
    category?: SkillCategory;

    constructor(obj: any) {
        super(obj);
        this.name = obj.name;
        this.category = obj.category;
    }
}

export class SkillCategory extends BaseDto {
    name: string;

    constructor(obj: any) {
        super(obj);
        this.name = obj.name;
    }
}

export class UserSkill {
    userId: number;
    skill: Skill;
    isMain?: boolean;
    orderId?: number;

    constructor(obj: any) {
        this.userId = obj.userId;
        this.skill = obj.skill;
        this.isMain = obj.isMain ?? null;
        this.orderId = obj.orderId ?? null;
    }
}

export class SkillQ extends Filters {
    public static id = 'id';
    public static skillName = 'name';
}