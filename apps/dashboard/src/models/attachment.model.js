const { Filters } = require('shared/utilities/criteria');

export class Attachment {
    id;
    createdAt;
    updatedAt;
    userId;
    url;
    type;

    constructor(obj) {
        this.id = obj.id;
        this.createdAt = obj.createdAt;
        this.updatedAt = obj.updatedAt;
        this.userId = obj.userId;
        this.url = obj.url;
        this.type = obj.type;
    }
}

export class AttachmentQ extends Filters {
    static id = 'id';
    static createdAt = 'createdAt';
    static userId = 'userId';
    static type = 'type';
    static url = 'url';
}