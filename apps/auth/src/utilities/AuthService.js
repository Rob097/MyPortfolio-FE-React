import { METHODS as methods } from "@common-lib/constants";
const BASE_URL = 'https://myportfolio-backend.it/api';
const AUTH_URL = BASE_URL + '/auth';
const JSON_HEADER = { "Content-Type": "application/json" }

export function login(data) {
    return fetch(AUTH_URL + "/signin", {
        method: methods.POST,
        headers: {
            ...JSON_HEADER
        },
        body: JSON.stringify({
            "username": data.email,
            "password": data.password,
            "rememberMe": data.rememberMe
        })
    })
}