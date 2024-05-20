import { EntityTypeEnum } from '@/models/categories.model';
import { EducationService } from '@/services/education.service';
import { ExperienceService } from '@/services/experience.service';
import { ProjectService } from '@/services/project.service';

export class EntityService {

    static getService(type) {
        switch (type) {
            case EntityTypeEnum.PROJECTS:
                return ProjectService;
            case EntityTypeEnum.EDUCATIONS:
                return EducationService;
            case EntityTypeEnum.EXPERIENCES:
                return ExperienceService;
            default:
                throw new Error('Invalid entity type');
        }
    }

    static getByIdUrl(type, id, view) {
        return this.getService(type).getByIdUrl(id, view);
    }

    static getBySlugUrl(type, slug, view) {
        return this.getService(type).getBySlugUrl(slug, view);
    }

    static getByCriteriaUrl(type, criteria) {
        return this.getService(type).getByCriteriaUrl(criteria);
    }

    static getById(type, id, view) {
        return this.getService(type).getById(id, view);
    }

    static getBySlug(type, slug, view) {
        return this.getService(type).getBySlug(slug, view);
    }

    static getByCriteria(type, criteria, returnHeaders) {
        return this.getService(type).getByCriteria(criteria, returnHeaders);
    }

    static create(type, entity) {
        return this.getService(type).create(entity);
    }

    static update(type, entity) {
        return this.getService(type).update(entity);
    }

    static delete(type, id) {
        return this.getService(type).delete(id);
    }

    static uploadCoverImage(type, id, file) {
        return this.getService(type).uploadCoverImage(id, file);
    }

    static removeCoverImage(type, id) {
        return this.getService(type).removeCoverImage(id);
    }

    static makeMultipartRequest(type, id, method, fileType, file) {
        return this.getService(type).makeMultipartRequest(id, method, fileType, file);
    }

}