const constants = require('@rob097/common-lib/constants');
import { View } from "@/models/criteria.model";
import useSWR from 'swr';
import { User, UserQ } from "../models/user.model";
import { BASE_URL, fetcher } from "./base.service";
const USERS_URL = BASE_URL + '/core/users';
const JSON_HEADER = { "Content-Type": "application/json" }

export function useUser(slug: string, view?: string) {
    const { data, error, isLoading, isValidating } = useSWR(UserService.getBySlugUrl(slug, view), fetcher);

    return {
        user: new User(data?.content),
        isLoading,
        isValidating,
        isError: error
    }
}

export default class UserService {

    static getBySlugUrl(slug: string, view?: string) {
        return USERS_URL + `/slug/${slug}` + '?view=' + (view || View.normal)
    }
    static getByIdUrl(id: number, view?: string) {
        return USERS_URL + `/${id}` + '?view=' + (view || View.normal)
    }

    static getById(id: number, view?: string) {
        return fetch(USERS_URL + `/${id}` + '?view=' + (view || View.normal), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    static getBySlug(slug: string, view?: string) {
        return fetch(this.getBySlugUrl(slug, view), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    static getByCriteria(criteria: UserQ) {
        return fetch(USERS_URL + criteria.toString(), {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }

    static getAllSlugs() {
        return fetch(USERS_URL + '/slugs', {
            method: constants.METHODS.GET,
            headers: {
                ...JSON_HEADER
            }
        })
    }
}