const constants = require('@rob097/common-lib/constants');
import { View } from "@rob097/common-lib/criteria.model";
import { Experience, ExperienceQ } from "../models/experience.model";
import { BaseService } from "./base.service";
const EXPERIENCES_URL = constants.BASE_URL + '/core/experiences';
const JSON_HEADER = { "Content-Type": "application/json" }

export class ExperienceService implements BaseService {


    getById(id: number, view?: string) {
        return fetch(EXPERIENCES_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getByCriteria(criteria: ExperienceQ) {
        return fetch(EXPERIENCES_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    update(experience: Experience) {
        return fetch(EXPERIENCES_URL + `/${experience.id}`, {
            method: constants.METHODS.PUT,
            headers: {
                ...JSON_HEADER
            },
            body: JSON.stringify(experience)
        })
    }
}