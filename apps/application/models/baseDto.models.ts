export class BaseDto {
    id: number;

    constructor(obj: any) {
        this.id = obj?.id;

        // Replace all undefined values with null
        Object.keys(this).forEach(key => {
            if (this[key] === undefined) {
                this[key] = null;
            }
        });
    }

    public static isEmpty(entity: BaseDto) {
        return !entity ||!entity?.id;
    }
}

export class AuditableDto extends BaseDto {
    createdAt: Date;
    updatedAt: Date;

    constructor(obj: any) {
        super(obj);
        this.createdAt = obj?.createdAt;
        this.updatedAt = obj?.updatedAt;
    }
}

export class SlugDto extends AuditableDto {
    slug: string;

    constructor(obj: any) {
        super(obj);
        this.slug = obj?.slug;
    }

    public static isEmpty(entity: SlugDto) {
        return super.isEmpty(entity) || !entity.slug;
    }
}