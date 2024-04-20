const constants = require('shared/utilities/constants');
const { View, Criteria, Filters, Operation } = require('shared/utilities/criteria');
import { fetcher } from "./base.service";
const STORIES_URL = process.env.NEXT_PUBLIC_BASE_URL + '/core/stories';

export class StoryService {

    static getByIdUrl(id, view) {
        return STORIES_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria) {
        return STORIES_URL + criteria.toString();
    }

    /////////////////////////////////////////////////////////////////

    static getById(id, view) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria, returnHeaders) {
        return fetcher(this.getByCriteriaUrl(criteria), returnHeaders);
    }

    /////////////////////////////////////////////////////////////////

    static create(story) {
        return fetcher(
            STORIES_URL,
            false,
            constants.METHODS.POST,
            story
        );
    }

    static update(story) {
        return fetcher(
            STORIES_URL + `/${story.id}`,
            false,
            constants.METHODS.PUT,
            story
        );
    }

}