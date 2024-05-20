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

    static getLabel(type, plural = false, capitalize = false) {
        switch (type) {
            case EntityTypeEnum.PROJECTS:
                return plural ? (capitalize ? 'Projects' : 'projects') : (capitalize ? 'Project' : 'project');
            case EntityTypeEnum.EXPERIENCES:
                return plural ? (capitalize ? 'Experiences' : 'experiences') : (capitalize ? 'Experience' : 'experience');
            case EntityTypeEnum.EDUCATIONS:
                return plural ? (capitalize ? 'Educations' : 'educations') : (capitalize ? 'Education' : 'education');
            default:
                return '';
        }
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