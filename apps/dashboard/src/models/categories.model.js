import { Education, EducationQ } from "./education.model";
import { Experience, ExperienceQ } from "./experience.model";
import { Project, ProjectQ } from "./project.model";

export class EntityTypeEnum {
    static PROJECTS = 'projects';
    static EXPERIENCES = 'experiences';
    static EDUCATIONS = 'educations';

    static isValid(type) {
        return type === this.PROJECTS || type === this.EXPERIENCES || type === this.EDUCATIONS;
    }

    static getLabel(type, plural = false, capitalize = false, t = null) {
        let result;
        switch (type) {
            case EntityTypeEnum.PROJECTS:
                result = plural ? (capitalize ? 'Projects' : 'projects') : (capitalize ? 'Project' : 'project');
                break;
            case EntityTypeEnum.EXPERIENCES:
                result = plural ? (capitalize ? 'Experiences' : 'experiences') : (capitalize ? 'Experience' : 'experience');
                break;
            case EntityTypeEnum.EDUCATIONS:
                result = plural ? (capitalize ? 'Educations' : 'educations') : (capitalize ? 'Education' : 'education');
                break;
            default:
                result = '';
                break;
        }
        result = t ? t(`labels.${result.toLowerCase()}`) : result;
        result = capitalize ? result.charAt(0).toUpperCase() + result.slice(1) : result;
        return result;
    }

    static getFilters(type) {
        switch (type) {
            case EntityTypeEnum.PROJECTS:
                return ProjectQ;
            case EntityTypeEnum.EXPERIENCES:
                return ExperienceQ;
            case EntityTypeEnum.EDUCATIONS:
                return EducationQ;
            default:
                return null;
        }
    }

    static getClass(type) {
        switch (type) {
            case EntityTypeEnum.PROJECTS:
                return Project;
            case EntityTypeEnum.EXPERIENCES:
                return Experience;
            case EntityTypeEnum.EDUCATIONS:
                return Education;
            default:
                return null;
        }
    }
}