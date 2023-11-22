import { View } from "@/models/criteria.model";
import { DiaryQ } from "../models/diary.model";
import { BASE_URL, fetcher } from "./base.service";
const DIARIES_URL = BASE_URL + '/core/diaries';

export default class DiaryService {

    static getByIdUrl(id: number, view?: string) {
        return DIARIES_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria: DiaryQ) {
        return DIARIES_URL + criteria.toString();
    }

    static getById(id: number, view?: string) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria: DiaryQ, returnHeaders?: boolean) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }
}