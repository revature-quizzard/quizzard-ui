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

    constructor(ancestors: string[], parent: string, description: string, subject: string, child_count: number, owner: string, id?: string, date_created?: string, tags?: string[]) {
        this.ancestors = ancestors;
        this.parent = parent;
        this.description = description;
        this.owner = owner;
        if (id) { this.id = id; }
        if (subject) { this.subject = subject; }
        if (child_count) { this.child_count = child_count; }
        if (date_created) { this.date_created = date_created; }
        if (tags) { this.tags = tags; }
    }
}