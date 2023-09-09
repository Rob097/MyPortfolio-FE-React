import { Filters } from "@/models/criteria.model";
import { Diary } from './diary.model';
import { Education } from './education.model';
import { Experience } from './experience.model';
import { UserSkill } from './skill.model';
import { Project } from './project.model';
import { Address } from "./address.model";

export class User {
    id: number;
    slug: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    nationality: string;
    address: Address;
    title: string;
    description: string;
    skills?: UserSkill[];
    educations?: Education[];
    experiences?: Experience[];
    diaries?: Diary[];
    projects?: Project[];
    avatar?: string;
    status?: string;

    constructor(obj: any) {
        this.id = obj?.id;
        this.slug = obj?.slug;
        this.email = obj?.email;
        this.phone = obj?.phone;
        this.firstName = obj?.firstName;
        this.lastName = obj?.lastName;
        this.age = obj?.age;
        this.sex = obj?.sex;
        this.nationality = obj?.nationality;
        this.title = obj?.title;
        this.description = obj?.description;
        this.address = obj?.address;
        this.skills = obj?.skills;
        this.educations = obj?.educations;
        this.experiences = obj?.experiences;
        this.diaries = obj?.diaries;
        this.projects = obj?.projects;
        this.avatar = obj?.avatar;
        this.status = obj?.status;

        // Replace all undefined values with null
        Object.keys(this).forEach(key => {
            if (this[key] === undefined) {
                this[key] = null;
            }
        });
    }

    public static getUserAddress(user: User) {
        const address = user?.address;
        return address?.city + ', ' + address?.province + ', ' + address?.nation;
    }
}

export class UserQ extends Filters {
    static id = 'id';
    static slug = 'slug';
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