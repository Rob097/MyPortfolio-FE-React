const constants = require('shared/utilities/constants');
const { displayMessages } = require('@/components/alerts/snack');

export const fetcher = async (url, returnHeaders, method, body, headers) => {
  const response = fetch(url, {
    method: method || constants.METHODS.GET,
    headers: {
      ...constants.HEADERS.JSON_HEADER,
      ...(headers || {})
    },
    body: body ? JSON.stringify(body) : undefined
  }).then(async (r) => {
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

      if (result.messages) {
        displayMessages(result.messages);
      }

      return result;
    });
  }).catch((error) => {
    console.debug("Fetcher Error: %O", error);
    const message = error?.message || "Errore sconosciuto";
    displayMessages([{ message, severity: "error" }]);
    return Promise.reject(error);
  });

  return response;
};