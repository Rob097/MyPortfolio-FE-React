import ProjectService, { useProject, useUserProjects } from '@/services/project.service';
import EducationService from '@/services/education.service';
import ExperienceService from '@/services/experience.service';
import { View } from '@/models/criteria.model';
import { EntityTypeEnum } from '@/models/categories.model';

export function useEntity(type: EntityTypeEnum, slug: string, view?: View) {

    if(type === EntityTypeEnum.PROJECTS) {
        const { project, isError, isLoading, isValidating } = useProject(slug, view);
        return {entity: project, isError, isLoading, isValidating};
    }

}

export function useUserEntities(type: EntityTypeEnum, userId: number, view?: View) {
    if(type === EntityTypeEnum.PROJECTS) {
        const { projects, isError, isLoading, isValidating } = useUserProjects(userId, view);
        return {entities: projects, isError, isLoading, isValidating};
    }
}


export default class EntityService {

    private static getService(type: EntityTypeEnum) {
        switch (type) {
            case EntityTypeEnum.PROJECTS:
                return ProjectService;
            case EntityTypeEnum.EDUCATION:
                return EducationService;
            case EntityTypeEnum.EXPERIENCES:
                return ExperienceService;
            default:
                throw new Error('Invalid entity type');
        }
    }

    static getBySlugUrl(type: EntityTypeEnum, slug: string, view?: View) {
        return this.getService(type).getBySlugUrl(slug, view);
    }

    static getByUserIdUrl(type: EntityTypeEnum, userId: number, view?: View) {
        return this.getService(type).getByUserIdUrl(userId, view);
    }

    static getBySlug(type: EntityTypeEnum, slug: string, view?: View) {
        return this.getService(type).getBySlug(slug, view);
    }

    static getByUserId(type: EntityTypeEnum, userId: number, view?: View) {
        return this.getService(type).getByUserId(userId, view);
    }

}