export class Comment {
    id: string;
    subject: string;
    ancestors: string[];
    parent: String;
    description: String;
    child_count: number;
    date_created: String;
    owner: String;
    tags: string[]

    constructor(id: string, subject: string, ancestors: string[], parent: string, description: string, child_count: number, date_created: string, owner: string, tags: string[]) {
        this.id = id;
        this.subject = subject;
        this.ancestors = ancestors;
        this.parent = parent;
        this.description = description;
        this.child_count = child_count;
        this.date_created = date_created;
        this.owner = owner;
        this.tags = tags;
    }
}