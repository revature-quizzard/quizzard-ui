import { TagFormModel } from "./new-tag-form";

export class  SaveTagFormModel{
    tagName : string;
    tagColor: string;
    tagAdded: boolean;
    index: number;

    constructor(tagColor : string , TagName : string , tagAdded: boolean ,  index: number)
    {
        this.tagColor = tagColor;
        this.tagName = TagName;
        this.tagAdded = tagAdded;
        this.index = index;
       
    }
}