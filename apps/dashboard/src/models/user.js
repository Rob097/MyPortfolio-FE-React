export class User {
    id = undefined;
    firstName = undefined;
    lastName = undefined;
    email = undefined;
    age = undefined;
    nationality = undefined;
    nation = undefined;
    province = undefined;
    city = undefined;
    cap = undefined;
    address = undefined;
    sex = undefined;

    constructor(obj){
        this.id = obj.id;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.age = obj.age;
        this.nationality = obj.nationality;
        this.nation = obj.nation;
        this.province = obj.province;
        this.city = obj.city;
        this.cap = obj.cap;
        this.address = obj.address;
        this.sex = obj.sex;
    }
}