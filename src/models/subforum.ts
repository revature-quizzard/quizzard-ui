export class SubforumDTO {

    id: string;
    subject: string;
    ancestors: string[];
    parent: string;
    description: string;
    childCount: number;
    dateCreate: string;
    owner: string;
    tags: string[];

    // Make sure this matches the Subforum object in the API!
    constructor(id: string, subject: string, ancestors: string[], parent: string, description: string, childCount: number, dateCreated: string, owner: string, tags: string[]) {
        this.id = id;
        this.subject = subject;
        this.ancestors = ancestors;
        this.parent = parent;
        this.description = description;
        this.childCount = childCount;
        this.dateCreate = dateCreated;
        this.owner = owner;
        this.tags = tags;
    }
}