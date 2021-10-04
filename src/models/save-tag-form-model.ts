import { Tag } from "../dtos/Tag";
import { TagFormModel } from "./new-tag-form";

export class  SaveTagFormModel{
    tags: Tag[]
    tagAdded: boolean;
    index: number;

    constructor( tags: Tag[], tagAdded: boolean ,  index: number)
    {
        this.tags = tags
        this.tagAdded = tagAdded;
        this.index = index;
       
    }
}