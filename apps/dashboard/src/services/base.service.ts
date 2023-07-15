import { Filters } from "common-new/criteria.model";

export interface BaseService {
    getById(id: number, view?: string): Promise<any>;
    getByCriteria(criteria: Filters): Promise<any>;
    
    update(entity: any): Promise<any>;
}