const constants = require('@rob097/common-lib/constants');
import { View } from "@/models/criteria.model";
import { Skill, SkillQ } from "../models/skill.model";
import { BaseService } from "./base.service";
const SKILLS_URL = constants.BASE_URL + '/core/skills';
const JSON_HEADER = { "Content-Type": "application/json" }

export class SkillService implements BaseService {


    getById(id: number, view?: string) {
        return fetch(SKILLS_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getByCriteria(criteria: SkillQ) {
        return fetch(SKILLS_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }
}