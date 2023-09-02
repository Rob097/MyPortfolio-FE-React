import { Filters } from "@/models/criteria.model";

export const BASE_URL = "http://localhost:8083/api";

export interface BaseService {
    getById(id: number, view?: string): Promise<any>;
    getByCriteria(criteria: Filters): Promise<any>;
}