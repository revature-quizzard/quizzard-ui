export class TagFormModel {
    tagColor: string;
    TagName: string;
    tagAdded: boolean;

    constructor(tagColor : string , TagName : string , tagAdded: boolean)
    {
        this.tagColor = tagColor;
        this.TagName = TagName;
        this.tagAdded = tagAdded;
    }
}