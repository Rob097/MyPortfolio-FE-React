const { Filters } = require('shared/utilities/criteria');

export interface BaseService {
    getById(id: number, view?: string): Promise<any>;
    getByCriteria(criteria: typeof Filters): Promise<any>;
    
    update(entity: any): Promise<any>;
}