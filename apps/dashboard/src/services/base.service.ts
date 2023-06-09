import { Filters } from "common-lib/criteria.model";

export interface BaseService {
    getById(id: number, view?: string): Promise<any>;
    getByCriteria(criteria: Filters): Promise<any>;
    
    update(entity: any): Promise<any>;
}