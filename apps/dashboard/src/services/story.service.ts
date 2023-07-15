const constants = require('common-new/constants');
import { View } from "common-new/criteria.model";
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

    update(story: Story) {
        return fetch(STORIES_URL + `/${story.id}`, {
            method: constants.METHODS.PUT,
            headers: {
                ...JSON_HEADER
            },
            body: JSON.stringify(story)
        })
    }
}