
/** AUTHENTICATION */
export const ROLES = {
    ROLE_BASIC: "ROLE_BASIC",
    ROLE_ADMIN: "ROLE_ADMIN"
}

export const PERMISSIONS = {
    USERS_READ: "users_read" // Permette di leggere i dati degli utenti
}

/** GLOBAL */
export const BASE_URL = "https://secure-backend.my-portfolio.it/api";

export const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE"
}

export const HEADERS = {
    JSON_HEADER: {
        "Content-Type": "application/json"
    },
    FORM_HEADER: {
        "ContentType": "multipart/form-data"
    }
}

export const OPERATIONS = {
    ADD: "add",
    REMOVE: "remove",
    REPLACE: "replace",
    MOVE: "move",
    COPY: "copy",
    TEST: "test"
}

export const MAX_FILE_SIZE = 1048576; // 1MB