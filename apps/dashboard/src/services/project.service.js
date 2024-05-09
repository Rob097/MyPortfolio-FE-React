const constants = require('shared/utilities/constants');
const { View } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const PROJECTS_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/projects';
const FILES_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/files';

export class ProjectService {

    static getByIdUrl(id, view) {
        return PROJECTS_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getBySlugUrl(slug, view) {
        return PROJECTS_URL + `/slug/${slug}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return PROJECTS_URL + criteria.toString();
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

    static create(project) {
        return fetcher(
            PROJECTS_URL,
            false,
            constants.METHODS.POST,
            project
        );
    }

    static update(project) {
        return fetcher(
            PROJECTS_URL + `/${project.id}`,
            false,
            constants.METHODS.PUT,
            project
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
    
        return fetch(`${FILES_URL}/PROJECT/${id}`, {
            method: method,
            headers: h,
            body: formData
        });
    }

}