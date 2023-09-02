const constants = require('@rob097/common-lib/constants');
import { View } from "@/models/criteria.model";
import { Story, StoryQ } from "../models/story.model";
import { BaseService } from "./base.service";
const STORIES_URL = constants.BASE_URL + '/core/stories';
const JSON_HEADER = { "Content-Type": "application/json" }

export class StoryService implements BaseService {


    getById(id: number, view?: string) {
        return fetch(STORIES_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    getByCriteria(criteria: StoryQ) {
        return fetch(STORIES_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }
}