const constants = require('@rob097/common-lib/constants');
import { View } from "@/models/criteria.model";
import { BASE_URL, fetcher } from "@/services/base.service";
import useSWR from "swr";
import { Story, StoryQ } from "../models/story.model";
const STORIES_URL = BASE_URL + '/core/stories';
const JSON_HEADER = { "Content-Type": "application/json" }

export function useStory(slug: string, view?: View) {
    const { data, error, isLoading, isValidating } = useSWR(StoryService.getBySlugUrl(slug, view), fetcher, { suspense: true });

    return {
        story: new Story(data?.content),
        isLoading,
        isValidating,
        isError: error
    }
}

export default class StoryService {

    static getBySlugUrl(slug: string, view?: View) {
        return STORIES_URL + `/slug/${slug}` + '?view=' + (view || View.normal);
    }
    static getByIdUrl(id: number, view?: string) {
        return STORIES_URL + `/${id}` + '?view=' + (view || View.normal);
    }
    static getByCriteriaUrl(criteria: StoryQ) {
        return STORIES_URL + criteria.toString();
    }

    static getById(id: number, view?: View) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getByCriteria(criteria: StoryQ) {
        return fetcher(this.getByCriteriaUrl(criteria));
    }

    static getBySlug(slug: string, view?: View) {
        return fetcher(this.getBySlugUrl(slug, view));
    }

}