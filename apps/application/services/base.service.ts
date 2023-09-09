import { Filters } from "@/models/criteria.model";

export const fetcher = async (url: string) => {
    const r = await fetch(url);
    const v = await r.json();
    return v;
}


// export const BASE_URL = "http://localhost:8083/api";
export const BASE_URL = "https:/secure.myportfolio-backend.it/api";

export interface BaseService {
    getById(id: number, view?: string): Promise<any>;
    getByCriteria(criteria: Filters): Promise<any>;
}