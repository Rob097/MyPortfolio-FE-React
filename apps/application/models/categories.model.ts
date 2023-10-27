export class EntityTypeEnum {
    public static PROJECTS = 'projects';
    public static EXPERIENCES = 'experiences';
    public static EDUCATION = 'education';

    public static isValid(type: string) {
        return type === this.PROJECTS || type === this.EXPERIENCES || type === this.EDUCATION;
    }
}