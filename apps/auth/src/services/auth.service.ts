const constants = require('shared/utilities/constants');
import { User } from "../models/user.model";
const AUTH_URL = process.env.NEXT_PUBLIC_BASE_URL + '/auth';
const JSON_HEADER = { "Content-Type": "application/json" }

export function signIn(data: any) {
    return fetch(AUTH_URL + "/signin", {
        method: constants.METHODS.POST,
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

export function signUp(data: User) {
    return fetch(AUTH_URL + "/signup", {
        method: constants.METHODS.POST,
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

export function setUpProfile(infos: any, userId: any, authToken: any) {
    return fetch(`${AUTH_URL}/${userId}/setup`, {
        method: constants.METHODS.PUT,
        headers: {
            ...JSON_HEADER,
            "Authorization": "Bearer " + authToken
        },
        body: JSON.stringify(infos)
    })
}