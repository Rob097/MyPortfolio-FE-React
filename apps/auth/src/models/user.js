export class User {
    email = '';
    roles = [];
    permissions = [];
    firstName = '';
    lastName = '';

    constructor(obj){
        this.email = obj.sub;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.roles = obj.roles;
        this.permissions = obj.authorities;
    }
}