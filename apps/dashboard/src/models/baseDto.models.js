export class BaseDto {
    id;

    constructor(obj) {
        this.id = obj?.id;

        // Replace all undefined values with null
        Object.keys(this).forEach(key => {
            if (this[key] === undefined) {
                this[key] = null;
            }
        });
    }

    static isEmpty(entity) {
        return !entity ||!entity?.id;
    }
}

export class AuditableDto extends BaseDto {
    createdAt;
    updatedAt;

    constructor(obj) {
        super(obj);
        this.createdAt = obj?.createdAt;
        this.updatedAt = obj?.updatedAt;
    }
}

export class SlugDto extends AuditableDto {
    slug;

    constructor(obj) {
        super(obj);
        this.slug = obj?.slug;
    }

    static isEmpty(entity) {
        return super.isEmpty(entity) || !entity.slug;
    }
}