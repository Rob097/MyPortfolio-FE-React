const { Filters } = require('shared/utilities/criteria');
const { displayMessages } = require('@/components/alerts/snack');


export const fetcher = async (url: string, returnHeaders?: boolean) => {
    const response = fetch(url)
      .then(async (r) => {
        return r.json().then((json) => {
          if (!r.ok && r.status !== 404) {
            console.debug("Fetcher Error: %O", json);
            return Promise.reject(json?.error || "Errore sconosciuto");
          }
  
          const result = {
            ...json
          }
  
          if (returnHeaders) {
            result["headers"] = r.headers;
          }

          if(result.messages) {
            displayMessages(result.messages);
          }
  
          return result;
        });
      });
  
    return response;
  }

export interface BaseService {
    getById(id: number, view?: string): Promise<any>;
    getByCriteria(criteria: typeof Filters): Promise<any>;
    
    update(entity: any): Promise<any>;
}