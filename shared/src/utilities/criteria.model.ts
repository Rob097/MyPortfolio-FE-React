// Enum of different possible operations to filter by
export enum Operation{
    equals = ':',
    lessThan = '<',
    greaterThan = '>',
    notEquals = '!'
}

// Enum of different verbosity of response
export enum View{
    verbose = 'verbose',
    normal = 'normal'
}

// Class that defines by what field we want to sort the response and in what direction
export class Sort {
    attribute: string;
    direction: 'DESC' | 'ASC' = 'ASC';

    constructor(attribute: string, direction: 'DESC' | 'ASC' = 'ASC'){
        this.attribute = attribute;
        this.direction = direction;
    }

    toString(): string {
        return this.attribute + ',' + this.direction;
    }

}

// Single criteria to apply to our query
export class Criteria {
    key: string;
    operation: string;
    value: any;

    constructor(key: string, operation: string, value: any){
        this.key = key;
        this.operation = operation;
        this.value = value;
    }

    toString(): string{
        return this.key + this.operation + this.value.toString();
    }

}




const DEFAULT_VIEW: View = View.normal;
const DEFAULT_PAGE: number = 0;
const DEFAULT_SIZE: number = 20;

// Class that rapresents all the filters we need.
export class Filters {
    criterias?: Criteria[];
    view?: View;
    page?: number;
    size?: number;
    sort?: Sort;

    constructor(citerias?: Criteria[], view?: View, page?: number, size?: number, sort?: Sort){
        this.criterias = citerias;
        this.view = view ? view : DEFAULT_VIEW;
        this.page = page ? page : DEFAULT_PAGE;
        this.size = size ? size : DEFAULT_SIZE;
        this.sort = sort ? sort : undefined;
    }

    // Generates a string like: 'name:Name of user,age:10'
    criteriasToString(): string {
        if(!this.criterias || this.criterias.length===0){
            return '';
        }

        let concatenation = '';

        this.criterias.forEach((criteria) => {
            concatenation += criteria.toString() + ',';
        });

        concatenation = concatenation.slice(0, concatenation.length-1);

        return concatenation;
    }

    // Generates the complete query to pass through a GET request (includes the delimiters ? and &)
    toString(): string{
        let result = '';

        if(this.criterias && this.criterias.length>0){
            result += (result==='' ? '?' : '&') + 'filters=' + this.criteriasToString();
        }
        if(this.view){
            result += (result==='' ? '?' : '&') + 'view=' + this.view;
        }
        if(this.page!== undefined){
            result += (result==='' ? '?' : '&') + 'page=' + this.page;
        }
        if(this.size!== undefined){
            result += (result==='' ? '?' : '&') + 'size=' + this.size;
        }
        if(this.sort){
            result += (result==='' ? '?' : '&') + 'sort=' + this.sort.toString();
        }

        return result;
    }

}