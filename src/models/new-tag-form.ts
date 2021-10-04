import { Tag } from "./tag";

export class TagFormModel {
    tags: Tag[]
    tagAdded: boolean;

    constructor(tags: Tag[] , tagAdded: boolean)
    {
        this.tags = tags;
        this.tagAdded = tagAdded;
    }
}