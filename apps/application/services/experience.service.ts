const constants = require('@rob097/common-lib/constants');
import { Criteria, Filters, Operation, View } from "@/models/criteria.model";
import { fetcher } from "@/services/base.service";
import { Experience, ExperienceQ } from "../models/experience.model";
import useSWR from "swr";
const EXPERIENCES_URL = constants.BASE_URL + '/core/experiences';
const JSON_HEADER = { "Content-Type": "application/json" }

export function useUserExperiences(userId: number, view?: View) {
    const { data, error, isLoading, isValidating } = useSWR(ExperienceService.getByUserIdUrl(userId, view), fetcher, { suspense: true });

    return {
        experiences: data?.content,
        isLoading,
        isValidating,
        isError: error
    }
}

export function useExperience(slug: string, view?: View) {
    const { data, error, isLoading, isValidating } = useSWR(ExperienceService.getBySlugUrl(slug, view), fetcher, { suspense: true });

    return {
        experience: new Experience(data?.content),
        isLoading,
        isValidating,
        isError: error
    }
}

export default class ExperienceService {

    static getByIdUrl(id: number, view?: string) {
        return EXPERIENCES_URL + `/${id}` + '?view=' + (view || View.normal);
    }

    static getBySlugUrl(slug: string, view?: View) {
        return EXPERIENCES_URL + `/slug/${slug}` + '?view=' + (view || View.normal);
    }

    static getByCriteriaUrl(criteria: ExperienceQ) {
        return EXPERIENCES_URL + criteria.toString();
    }

    static getByUserIdUrl(userId: number, view?: View) {
        const criteria = new Criteria(ExperienceQ.userId, Operation.equals, userId);
        const filters = new Filters([criteria], view || View.normal);
        return this.getByCriteriaUrl(filters);
    }

    /////////////////////////////////////////////////////////////////

    static getById(id: number, view?: View) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getBySlug(slug: string, view?: View) {
        return fetcher(this.getBySlugUrl(slug, view));
    }

    static getByCriteria(criteria: ExperienceQ) {
        return fetcher(this.getByCriteriaUrl(criteria));
    }

    static getByUserId(userId: number, view?: View) {
        return fetcher(this.getByUserIdUrl(userId, view));
    }
}