import Snack from "@/components/utils/snack";
import { Filters } from "@/models/criteria.model";
import * as fetchIntercept from 'fetch-intercept';

export const fetcher = async (url: string) => {
  const response = fetch(url)
    .then(async (r) => {
      const json = await r.json();

      if (!r.ok) {
        const error = new Error((json?.messages[0]?.text + " TEST") || "Errore sconosciuto");
        error.name = r.status.toString();
        throw error;
      }

      const messages = json?.messages;
      if (messages) {
        messages.forEach((m: any) => {
          if (m.level === "ERROR") {
            Snack.error(m.text);
          } else if (m.level === "WARNING") {
            Snack.warning(m.text);
          } else if (m.level === "INFO") {
            Snack.info(m.text);
          } else if (m.level === "SUCCESS") {
            Snack.success(m.text);
          }
        });
      }

      return json;

    });

  unregister();
  return response;
}


// export const BASE_URL = "http://localhost:8083/api";
export const BASE_URL = "https:/secure.myportfolio-backend.it/api";

export interface BaseService {
  getById(id: number, view?: string): Promise<any>;
  getByCriteria(criteria: Filters): Promise<any>;
}

const unregister = fetchIntercept.register({
  /* request: function (url, config) {
      console.log("Intercepted: %O", url);
      const modifiedUrl = BASE_URL;
      return [url, config];
  },
 
  requestError: function (error) {
      console.log("Intercepted1: %O", error);
    return Promise.reject(error);
  },*/

  response: function (response) {
    if (response.url.includes(BASE_URL)) {
      console.log("response: %O", response);
    }

    return response;
  },

  responseError: function (error) {
    console.log("responseError: %O", error);
    Snack.error(error.message);
    return Promise.reject(error);
  },
});