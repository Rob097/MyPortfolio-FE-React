export class Address {
    nationality: string;
    nation: string;
    province: string;
    city: string;
    cap: string;
    address: string;

    constructor(obj: any) {
        if (obj) {
            this.nationality = obj.nationality;
            this.nation = obj.nation;
            this.province = obj.province;
            this.city = obj.city;
            this.cap = obj.cap;
            this.address = obj.address;
        }
    }
}