import { METHODS as methods, BASE_URL } from "@rob097/common-lib/constants";
const AUTH_URL = BASE_URL/* 'https://myportfolio-backend.it/api' */ + '/auth';
const JSON_HEADER = { "Content-Type": "application/json" }

export function signIn(data) {
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

export function signUp(data) {
    return fetch(AUTH_URL + "/signup", {
        method: methods.POST,
        headers: {
            ...JSON_HEADER
        },
        body: JSON.stringify({
            "firstName": data.firstName,
            "lastName": data.lastName,
            "email": data.email,
            "password": data.password,
            "matchingPassword": data.matchingPassword
        })
    })
}