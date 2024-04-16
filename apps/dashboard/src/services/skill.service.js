const constants = require('shared/utilities/constants');
const { View, Criteria, Filters, Operation } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const SKILLS_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/skills';
const SKILL_CATEGORIES_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/skillsCategories';

export class SkillService {

    static getByIdUrl(id, view) {
        return SKILLS_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return SKILLS_URL + criteria.toString();
    }
    static getCategoriesByCriteriaUrl(criteria) {
        return SKILL_CATEGORIES_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria, returnHeaders) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    static getCategoriesByCriteria(criteria, returnHeaders) {
        return fetcher(this.getCategoriesByCriteriaUrl(criteria), returnHeaders);
    }

    /////////////////////////////////////////////////////////////////

    static create(skill) {
        return fetcher(
            SKILLS_URL,
            false,
            constants.METHODS.POST,
            skill
        );
    }

    static createCategory(category) {
        return fetcher(
            SKILL_CATEGORIES_URL,
            false,
            constants.METHODS.POST,
            category
        );
    }
}