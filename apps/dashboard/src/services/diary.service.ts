const constants = require('@rob097/common-lib/constants');
import { View } from "@rob097/common-lib/criteria.model";
import { Diary, DiaryQ } from "../models/diary.model";
import { BaseService } from "./base.service";
const DIARIES_URL = constants.BASE_URL + '/core/diaries';
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

    update(diary: Diary) {
        return fetch(DIARIES_URL + `/${diary.id}`, {
            method: constants.METHODS.PUT,
            headers: {
                ...JSON_HEADER
            },
            body: JSON.stringify(diary)
        })
    }
}