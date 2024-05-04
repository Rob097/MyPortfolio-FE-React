const constants = require('shared/utilities/constants');
const { View } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const EDUCATIONS_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/educations';

export class EducationService {

    static getByIdUrl(id, view) {
        return EDUCATIONS_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return EDUCATIONS_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria, returnHeaders) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    /////////////////////////////////////////////////////////////////

    static create(education) {
        return fetcher(
            EDUCATIONS_URL,
            false,
            constants.METHODS.POST,
            education
        );
    }

    static update(education) {
        return fetcher(
            EDUCATIONS_URL + `/${education.id}`,
            false,
            constants.METHODS.PUT,
            education
        );
    }

}