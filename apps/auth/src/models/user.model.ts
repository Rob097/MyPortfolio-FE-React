export class User {
    email: string = '';
    roles = [];
    permissions = [];
    firstName: string = '';
    lastName: string = '';
    password: string = '';
    matchingPassword: string = '';

    constructor(obj: any){
        this.email = obj.sub;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.roles = obj.roles;
        this.permissions = obj.authorities;
    }
}