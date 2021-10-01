export class Thread {
    id: string;
    subject: string;
    ancestors: string[];
    parent: String;
    description: String;
    child_count: number;
    date_created: String;
    owner: String;
    tags: string[]

    constructor(ancestors: string[], parent: string, description: string, subject: string, owner: string, id?: string, child_count?: number, date_created?: string, tags?: string[]) {
        this.ancestors = ancestors;
        this.parent = parent;
        this.description = description;
        this.subject = subject;
        this.owner = owner;
        if (id) { this.id = id; }
        if (child_count) { this.child_count = child_count; }
        if (date_created) { this.date_created = date_created; }
        if (tags) { this.tags = tags; }
    }
}