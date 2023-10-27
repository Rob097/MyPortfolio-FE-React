const constants = require('@rob097/common-lib/constants');
import { Criteria, Filters, Operation, View } from "@/models/criteria.model";
import { fetcher } from "@/services/base.service";
import { EducationQ } from "../models/education.model";
const EDUCATIONS_URL = constants.BASE_URL + '/core/educations';
const JSON_HEADER = { "Content-Type": "application/json" }

export default class EducationService {

    static getByIdUrl(id: number, view?: string) {
        return EDUCATIONS_URL + `/${id}` + '?view=' + (view || View.normal);
    }

    static getBySlugUrl(slug: string, view?: View) {
        return EDUCATIONS_URL + `/slug/${slug}` + '?view=' + (view || View.normal);
    }

    static getByCriteriaUrl(criteria: EducationQ) {
        return EDUCATIONS_URL + criteria.toString();
    }

    static getByUserIdUrl(userId: number, view?: View) {
        const criteria = new Criteria(EducationQ.userId, Operation.equals, userId);
        const filters = new Filters([criteria], view || View.normal);
        return this.getByCriteriaUrl(filters);
    }

    /////////////////////////////////////////////////////////////////

    static getById(id: number, view?: View) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getBySlug(slug: string, view?: View) {
        return fetcher(this.getBySlugUrl(slug, view));
    }

    static getByCriteria(criteria: EducationQ) {
        return fetcher(this.getByCriteriaUrl(criteria));
    }

    static getByUserId(userId: number, view?: View) {
        return fetcher(this.getByUserIdUrl(userId, view));
    }
}