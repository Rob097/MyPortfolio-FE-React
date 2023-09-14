import Snack, { VariantType } from "@/components/alerts/snack";
import { Filters } from "@/models/criteria.model";
import * as fetchIntercept from 'fetch-intercept';

export const fetcher = async (url: string) => {
  const response = fetch(url).then(async (r) => { 
    // timer of 5 seconds:
    // await new Promise(resolve => setTimeout(resolve, 5000));

    return await r.json() 
  });

  unregister();
  return response;
}


// export const BASE_URL = "http://localhost:8083/api";
export const BASE_URL = "https://secure.myportfolio-backend.it/api";

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

    // If it is a response from the backend, display the messages
    if (response.url.includes(BASE_URL)) {

      const clonedResponse = response.clone();

      clonedResponse.json().then((json) => {

        if (!clonedResponse.ok) {
          const error = new Error((json?.messages[0]?.text) || "Errore sconosciuto");
          error.name = clonedResponse.status.toString();
          throw error;
        }

        const messages = json?.messages;
        if (messages) {
          messages.forEach((m: any) => {
            if (m.level === VariantType.error.toUpperCase()) {
              Snack.error(m.text);
            } else if (m.level === VariantType.warning.toUpperCase()) {
              Snack.warning(m.text);
            } else if (m.level === VariantType.info.toUpperCase()) {
              Snack.info(m.text);
            } else if (m.level === VariantType.success.toUpperCase()) {
              Snack.success(m.text);
            }
          });
        }

        return json;
      });

    }

    return response;

  },

  responseError: function (error) {
    Snack.error(error.message);
    return Promise.reject(error);
  },
});