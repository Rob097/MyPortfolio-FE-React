const constants = require('@rob097/common-lib/constants');
import { View } from "@/models/criteria.model";
import { UserQ } from "../models/user.model";
import { BASE_URL } from "./base.service";
const USERS_URL = BASE_URL + '/core/users';
const JSON_HEADER = { "Content-Type": "application/json" }

export default class UserService {
 
    static getById(id: number, view?: string) {
        return fetch(USERS_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    static getBySlug(slug: string, view?: string) {
        return fetch(USERS_URL + `/slug/${slug}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    static getByCriteria(criteria: UserQ) {
        return fetch(USERS_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    static getAllSlugs() {
        return fetch(USERS_URL + '/slugs', {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }
}