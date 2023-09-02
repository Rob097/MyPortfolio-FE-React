const constants = require('@rob097/common-lib/constants');
import { View } from "@/models/criteria.model";
import { Diary, DiaryQ } from "../models/diary.model";
import { BaseService, BASE_URL } from "./base.service";
const DIARIES_URL = BASE_URL + '/core/diaries';
const JSON_HEADER = { "Content-Type": "application/json" }

export class DiaryService implements BaseService {
    getById(id: number, view?: string) {
        return fetch(DIARIES_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getByCriteria(criteria: DiaryQ) {
        return fetch(DIARIES_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }
}