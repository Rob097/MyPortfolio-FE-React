const constants = require('shared/utilities/constants');
const { displayMessages } = require('@/components/alerts');

export const fetcher = async (url, returnHeaders, method, body, customHeaders) => {

  // Read the authorization header from the localStorage
  const auth = JSON.parse(localStorage.getItem("AuthContext"));
  const token = auth?.token;

  const response = fetch(url, {
    method: method || constants.METHODS.GET,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...constants.HEADERS.JSON_HEADER,
      ...customHeaders
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(async (r) => {
    return r.json().then((json) => {
      if (!r.ok && r.status !== 404) {
        console.debug("Fetcher Error1: %O", json);
        return Promise.reject(json?.error ?? json.messages ?? "Errore sconosciuto");
      }

      const result = {
        ...json
      }

      if (returnHeaders) {
        result["headers"] = r.headers;
      }

      if (result.messages) {
        displayMessages(result.messages);
      }

      return result;
    });
  }).catch((error) => {
    console.debug("Fetcher Error2: %O", error);
    if (Array.isArray(error)) {
      displayMessages(error);
    } else {
      const message = error?.message ?? "Errore sconosciuto";
      displayMessages([{ text: message, level: "error" }]);
    }
    return Promise.reject(error);
  });

  return response;
};