import { Filters } from "@/models/criteria.model";

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

        return result;
      });
    });

  return response;
}

// export const BASE_URL = "http://localhost:8083/api";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export interface BaseService {
  getById(id: number, view?: string): Promise<any>;
  getByCriteria(criteria: Filters): Promise<any>;
}