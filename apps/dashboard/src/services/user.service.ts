const constants = require('shared/utilities/constants');
const { View } = require('shared/utilities/criteria');
import { User, UserQ } from "../models/user.model";
import { BaseService } from "./base.service";
const USERS_URL = constants.BASE_URL + '/core/users';
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

    getByCriteria(criteria: UserQ) {
        return fetch(USERS_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    update(user: User) {
        return fetch(USERS_URL + `/${user.id}`, {
            method: constants.METHODS.PUT,
            headers: {
                ...JSON_HEADER
            },
            body: JSON.stringify(user)
        })
    }
}