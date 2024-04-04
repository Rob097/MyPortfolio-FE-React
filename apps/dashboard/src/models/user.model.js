const { Filters } = require('shared/utilities/criteria');
export class User {
    id;
    email;
    firstName;
    lastName;
    age;
    sex;
    nationality;
    nation;
    province;
    city;
    cap;
    address;
    avatar;
    status;
    customizations;

    constructor(obj) {
        this.id = obj.id;
        this.email = obj.email;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.age = obj.age;
        this.sex = obj.sex;
        this.nationality = obj.nationality;
        this.nation = obj.nation;
        this.province = obj.province;
        this.city = obj.city;
        this.cap = obj.cap;
        this.address = obj.address;
        this.avatar = obj.avatar;
        this.status = obj.status;
        this.customizations = obj.customizations;
    }
}

export class UserQ extends Filters {
    static id = 'id';
    static email = 'email';
    static firstName = 'firstName';
    static lastName = 'lastName';
    static age = 'age';
    static sex = 'sex';
    static nationality = 'nationality';
    static nation = 'nation';
    static province = 'province';
    static city = 'city';
    static cap = 'cap';
    static address = 'address';
}