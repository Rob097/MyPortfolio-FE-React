export class User {
    id: number;
    email: string = '';
    roles = [];
    permissions = [];
    firstName: string = '';
    lastName: string = '';
    password: string = '';
    matchingPassword: string = '';
    customizations: any = {};

    constructor(obj: any){
        this.id = obj.id;
        this.email = obj.email;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.roles = obj.roles;
        this.permissions = obj.authorities ?? obj.permissions;
        this.customizations = JSON.parse(obj.customizations);
    }
}