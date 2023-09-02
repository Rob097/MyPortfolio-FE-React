const constants = require('@rob097/common-lib/constants');
import { Filters, View } from "@/models/criteria.model";
import { User, UserQ } from "../models/user.model";
import { BaseService, BASE_URL } from "./base.service";
import { jwtToken } from '@/data/mock/auth';
const USERS_URL = BASE_URL + '/core/users';
const JSON_HEADER = { "Content-Type": "application/json" }

export class UserService implements BaseService {

    getById(id: number, view?: string) {
        return fetch(USERS_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getBySlug(slug: string, view?: string) {
        return fetch(USERS_URL + `/slug/${slug}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getByCriteria(criteria: UserQ) {
        return fetch(USERS_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getAllSlugs() {
        return fetch(USERS_URL + '/slugs', {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }
}