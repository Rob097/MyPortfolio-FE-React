const constants = require('shared/utilities/constants');
const { View } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const ATTACHMENTS_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/attachments';

export class AttachmentService {

    static getByIdUrl(id, view) {
        return ATTACHMENTS_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return ATTACHMENTS_URL + (criteria?.toString() ?? '');
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria, returnHeaders) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    /////////////////////////////////////////////////////////////////

    static create(files) {
        let formData = new FormData();
        formData.append('files', files);

        const h = {};
        h.Authorization = `Bearer ${JSON.parse(localStorage.getItem("AuthContext"))?.token}`;
        h.ContentType = "multipart/form-data";
        h.Accept = "application/json";

        return fetch(`${ATTACHMENTS_URL}/new`, {
            method: constants.METHODS.POST,
            headers: h,
            body: formData
        });
    }

    static delete(ids) {
        let formData = new FormData();
        formData.append('ids', ids);

        const h = {};
        h.Authorization = `Bearer ${JSON.parse(localStorage.getItem("AuthContext"))?.token}`;
        h.ContentType = "multipart/form-data";
        h.Accept = "application/json";

        return fetch(`${ATTACHMENTS_URL}/delete`, {
            method: constants.METHODS.DELETE,
            headers: h,
            body: formData
        });
    }

    /////////////////////////////////////////////////////////////////

}