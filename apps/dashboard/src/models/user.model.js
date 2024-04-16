const { Filters } = require('shared/utilities/criteria');

/*
{"user":{"id":22,"createdAt":"2024-04-03T07:41:42.981+00:00","updatedAt":"2024-04-03T07:42:04.777+00:00","slug":"roberto-dellantonio","firstName":"Roberto","lastName":"Dellantonio","email":"dellantonio47@gmail.com","address":{"nation":"Italy","province":"Trento","city":"Predazzo","cap":"38037","address":"Via Garibaldi 74"},"profession":"Software Engineer","presentation":"Something about me","customizations":"{}","diaries":[],"projects":[],"educations":[],"experiences":[],"skills":[{"skill":{"id":1,"name":"Java","category":{"id":2,"name":"Programmazione BE"}},"userId":22,"isMain":true,"orderId":1},{"skill":{"id":3,"name":"MySql","category":{"id":3,"name":"DBMS"}},"userId":22,"isMain":true,"orderId":3},{"skill":{"id":2,"name":"React","category":{"id":1,"name":"Programmazione FE"}},"userId":22,"isMain":true,"orderId":2}]}}
*/

export class User {
    id;
    createdAt;
    updatedAt;
    slug;
    firstName;
    lastName;
    email;
    address;
    profession;
    presentation;
    customizations;
    diaries;
    projects;
    educations;
    experiences;
    skills;

    constructor(obj) {
        this.id = obj.id;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
        this.slug = obj.slug;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.address = obj.address ? new Address(obj.address) : {};
        this.profession = obj.profession;
        this.presentation = obj.presentation;
        this.customizations = obj.customizations ? JSON.parse(obj.customizations) : {};
        this.diaries = obj.diaries;
        this.projects = obj.projects;
        this.educations = obj.educations;
        this.experiences = obj.experiences;
        this.skills = obj.skills;
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

export class Address {
    nationality;
    nation;
    province;
    city;
    cap;
    address;

    constructor(obj) {
        this.nationality = obj.nationality;
        this.nation = obj.nation;
        this.province = obj.province;
        this.city = obj.city;
        this.cap = obj.cap;
        this.address = obj.address;
    }
}