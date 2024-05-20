const constants = require('shared/utilities/constants');
const { View } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const EXPERIENCES_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/experiences';

export class ExperienceService {

    static getByIdUrl(id, view) {
        return EXPERIENCES_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getBySlugUrl(slug, view) {
        return EXPERIENCES_URL + `/slug/${slug}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return EXPERIENCES_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getBySlug(slug, view) {
        return fetcher(this.getBySlugUrl(slug, view));
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

    static delete(experienceId) {
        return fetcher(
            EXPERIENCES_URL + `/${experienceId}`,
            false,
            constants.METHODS.DELETE,
            null
        );
    }

    /////////////////////////////////////////////////////////////////

    static uploadCoverImage(id, file) {
        return this.makeMultipartRequest(id, constants.METHODS.POST, 'COVER_IMAGE', file);
    }
    static removeCoverImage(id) {
        return this.makeMultipartRequest(id, constants.METHODS.DELETE, 'COVER_IMAGE');
    }

    static makeMultipartRequest(id, method, fileType, file) {
        let formData = new FormData();
        formData.append('fileType', fileType);
        if (file) {
            formData.append('files', file);
        }

        const h = {};
        h.Authorization = `Bearer ${JSON.parse(localStorage.getItem("AuthContext"))?.token}`;
        h.ContentType = "multipart/form-data";
        h.Accept = "application/json";

        return fetch(`${FILES_URL}/EXPERIENCE/${id}`, {
            method: method,
            headers: h,
            body: formData
        });
    }

}