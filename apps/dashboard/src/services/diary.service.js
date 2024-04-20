const constants = require('shared/utilities/constants');
const { View, Criteria, Filters, Operation } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const DIARIES_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/diaries';

export class DiaryService {

    static getByIdUrl(id, view) {
        return DIARIES_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return DIARIES_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria, returnHeaders) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    /////////////////////////////////////////////////////////////////

    static create(diary) {
        return fetcher(
            DIARIES_URL,
            false,
            constants.METHODS.POST,
            diary
        );
    }

    static update(diary) {
        return fetcher(
            DIARIES_UR + `/${diary.id}`,
            false,
            constants.METHODS.PUT,
            diary
        );
    }

}