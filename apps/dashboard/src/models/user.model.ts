const { Filters } = require('shared/utilities/criteria');
export class User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    nationality: string;
    nation: string;
    province: string;
    city: string;
    cap: string;
    address: string;
    avatar?: string;
    status?: string;

    constructor(obj: any) {
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