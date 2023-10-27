import { Criteria, Filters, Operation, View } from "@/models/criteria.model";
import { Project, ProjectQ } from "@/models/project.model";
import { fetcher } from "@/services/base.service";
import useSWR from "swr";

const constants = require('@rob097/common-lib/constants');
const PROJECTS_URL = constants.BASE_URL + '/core/projects';
const JSON_HEADER = { "Content-Type": "application/json" }

export function useUserProjects(userId: number, view?: View) {
    const { data, error, isLoading, isValidating } = useSWR(ProjectService.getByUserIdUrl(userId, view), fetcher, { suspense: true });

    return {
        projects: data?.content,
        isLoading,
        isValidating,
        isError: error
    }
}

export function useProject(slug: string, view?: View) {
    const { data, error, isLoading, isValidating } = useSWR(ProjectService.getBySlugUrl(slug, view), fetcher, { suspense: true });

    return {
        project: new Project(data?.content),
        isLoading,
        isValidating,
        isError: error
    }
}

export default class ProjectService {

    static getAllSlugsByUserIdUrl(userId: number) {
        return PROJECTS_URL + `/slugs/${userId}`;
    }

    static getByIdUrl(id: number, view?: string) {
        return PROJECTS_URL + `/${id}` + '?view=' + (view || View.normal);
    }

    static getBySlugUrl(slug: string, view?: View) {
        return PROJECTS_URL + `/slug/${slug}` + '?view=' + (view || View.normal);
    }

    static getByCriteriaUrl(criteria: ProjectQ) {
        return PROJECTS_URL + criteria.toString();
    }

    static getByUserIdUrl(userId: number, view?: View) {
        const criteria = new Criteria(ProjectQ.userId, Operation.equals, userId);
        const filters = new Filters([criteria], view || View.normal);
        return this.getByCriteriaUrl(filters);
    }

    /////////////////////////////////////////////////////////////////

    static getAllSlugsByUserId(userId: number) {
        return fetcher(this.getAllSlugsByUserIdUrl(userId));
    }

    static getById(id: number, view?: View) {
        return fetcher(this.getByIdUrl(id, view));
    }

    static getBySlug(slug: string, view?: View) {
        return fetcher(this.getBySlugUrl(slug, view));
    }

    static getByCriteria(criteria: ProjectQ) {
        return fetcher(this.getByCriteriaUrl(criteria));
    }

    static getByUserId(userId: number, view?: View) {
        return fetcher(this.getByUserIdUrl(userId, view));
    }
}