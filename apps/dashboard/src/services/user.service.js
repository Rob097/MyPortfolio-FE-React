const constants = require('shared/utilities/constants');
const { View, Criteria, Filters, Operation } = require('shared/utilities/criteria');
import { User, UserQ } from "../models/user.model";
import { BaseService, fetcher } from "./base.service";
const USERS_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/users';

export class UserService {

    static getByIdUrl(id, view) {
        return USERS_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return USERS_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria, returnHeaders) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    static getByEmail(email) {
        const criteria = new Criteria(UserQ.email, Operation.equals, email);
        const filters = new Filters([criteria], View.normal);
        return this.getByCriteria(filters);
    }

    /////////////////////////////////////////////////////////////////

    static update(user) {
        return fetcher(
            `${USERS_URL}/${user.id}`,
            false,
            constants.METHODS.PUT,
            user
        );
    }
}