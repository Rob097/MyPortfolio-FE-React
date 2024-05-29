const constants = require('shared/utilities/constants');
const { View, Criteria, Filters, Operation } = require('shared/utilities/criteria');
import { mutate } from 'swr';
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
        user.customizations = JSON.stringify(user.customizations);
        return this.update(user);
    }

    static delete(userId) {
        return fetcher(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/${userId}`,
            false,
            constants.METHODS.DELETE
        );
    }

    /////////////////////////////////////////////////////////////////

    static uploadAvatar(id, file) {
        return this.makeMultipartRequest(id, constants.METHODS.POST, 'PROFILE_IMAGE', file);
    }
    
    static removeAvatar(id) {
        return this.makeMultipartRequest(id, constants.METHODS.DELETE, 'PROFILE_IMAGE');
    }

    static uploadCV(id, file, lang) {
        return this.makeMultipartRequest(id, constants.METHODS.POST, 'CURRICULUM_VITAE', file, lang);
    }
    
    static removeCV(id, lang) {
        return this.makeMultipartRequest(id, constants.METHODS.DELETE, 'CURRICULUM_VITAE', null, lang);
    }

    static makeMultipartRequest(id, method, fileType, file, lang) {
        let formData = new FormData();
        formData.append('fileType', fileType);
        if (file) {
            formData.append('files', file);
        }
        if (lang) {
            formData.append('language', lang);
        }
    
        const h = {};
        h.Authorization = `Bearer ${JSON.parse(localStorage.getItem("AuthContext"))?.token}`;
        h.ContentType = "multipart/form-data";
        h.Accept = "application/json";
    
        return fetch(`${FILES_URL}/USER/${id}`, {
            method: method,
            headers: h,
            body: formData
        });
    }

    /////////////////////////////////////////////////////////////////

    static invalidateCurrentUser() {
        const userId = JSON.parse(localStorage.getItem("AuthContext"))?.user?.id;
        mutate(this.getByIdUrl(userId, View.verbose));
    }

}