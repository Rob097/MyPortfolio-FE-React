const constants = require('shared/utilities/constants');
const { View, Criteria, Filters, Operation } = require('shared/utilities/criteria');
import { User, UserQ } from "../models/user.model";
import { fetcher } from "./base.service";
const USERS_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/users';
const FILES_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/files';

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

    static updateSomeData(originalUser, dataToChange) {
        const user = new User(originalUser);
        Object.keys(dataToChange).forEach(key => {
            user[key] = dataToChange[key];
        });
        user.customizations.profileImage = dataToChange.customizations.profileImage;
        user.customizations.CV = dataToChange.customizations.CV;
        user.customizations = JSON.stringify(user.customizations);
        return this.update(user);
    }

    static uploadAvatar(id, file) {
        let formData = new FormData();
        formData.append('files', file);
        formData.append('fileType', 'PROFILE_IMAGE');

        const h = {};
        h.Authorization = `Bearer ${JSON.parse(localStorage.getItem("AuthContext"))?.token}`;
        h.ContentType = "multipart/form-data";
        h.Accept = "application/json";

        return fetch(`${FILES_URL}/USER/${id}`, {
            method: constants.METHODS.POST,
            headers: h,
            body: formData
        });
    }
}