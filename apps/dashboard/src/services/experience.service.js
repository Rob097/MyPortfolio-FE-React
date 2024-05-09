const constants = require('shared/utilities/constants');
const { View } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const EXPERIENCES_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/experiences';

export class ExperienceService {

    static getByIdUrl(id, view) {
        return EXPERIENCES_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return EXPERIENCES_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria, returnHeaders) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    /////////////////////////////////////////////////////////////////

    static create(experience) {
        return fetcher(
            EXPERIENCES_URL,
            false,
            constants.METHODS.POST,
            experience
        );
    }

    static update(experience) {
        return fetcher(
            EXPERIENCES_URL + `/${experience.id}`,
            false,
            constants.METHODS.PUT,
            experience
        );
    }

}