import { METHODS as methods, BASE_URL } from "common-lib/constants";
const USERS_URL = BASE_URL + '/core/users';
const JSON_HEADER = { "Content-Type": "application/json" }

export class UserService {
    static update(user) {
        return fetch(USERS_URL + `/${user.id}`, {
            method: methods.PUT,
            headers: {
                ...JSON_HEADER
            },
            body: JSON.stringify(user)
        })
    }
}