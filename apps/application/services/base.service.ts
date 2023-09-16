import { Filters } from "@/models/criteria.model";

export const fetcher = async (url: string) => {
  const response = fetch(url)
    .then(async (r) => {
      return r.json().then((json) => {
        if (!r.ok && r.status !== 404) {
          return Promise.reject(json?.error || "Errore sconosciuto");
        }
        return json;
      });
    });

  return response;
}

// export const BASE_URL = "http://localhost:8083/api";
export const BASE_URL = "https://secure.myportfolio-backend.it/api";

export interface BaseService {
  getById(id: number, view?: string): Promise<any>;
  getByCriteria(criteria: Filters): Promise<any>;
}