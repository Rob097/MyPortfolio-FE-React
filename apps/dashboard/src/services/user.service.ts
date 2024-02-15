const constants = require('shared/utilities/constants');
const { View, Criteria, Filters, Operation } = require('shared/utilities/criteria');
import { User, UserQ } from "../models/user.model";
import { BaseService, fetcher } from "./base.service";
const USERS_URL = constants.BASE_URL + '/core/users';
const JSON_HEADER = { "Content-Type": "application/json" }

export class UserService implements BaseService {

    private getByIdUrl(id: number, view?: string) {
        return USERS_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    private getByCriteriaUrl(criteria: UserQ) {
        return USERS_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    getById(id: number, view?: string) {
        return fetcher(this.getByIdUrl(id, view));
    }

    getByCriteria(criteria: UserQ, returnHeaders?: boolean) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    getByEmail(email: string) {
        const criteria = new Criteria(UserQ.email, Operation.equals, email);
        const filters = new Filters([criteria], View.normal);
        return this.getByCriteria(filters);
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