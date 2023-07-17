const constants = require('@rob097/common-lib/constants');
import { View } from "@rob097/common-lib/criteria.model";
import { Education, EducationQ } from "../models/education.model";
import { BaseService } from "./base.service";
const EDUCATIONS_URL = constants.BASE_URL + '/core/educations';
const JSON_HEADER = { "Content-Type": "application/json" }

export class EducationService implements BaseService {


    getById(id: number, view?: string) {
        return fetch(EDUCATIONS_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getByCriteria(criteria: EducationQ) {
        return fetch(EDUCATIONS_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    update(education: Education) {
        return fetch(EDUCATIONS_URL + `/${education.id}`, {
            method: constants.METHODS.PUT,
            headers: {
                ...JSON_HEADER
            },
            body: JSON.stringify(education)
        })
    }
}