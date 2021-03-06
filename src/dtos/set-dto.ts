import { Tag } from "./Tag"


export class SetDto {
    setName: string;
    isPublic: boolean;
    author: string;
    tags: string[];
    // You need something for Accounts, I'd recommend using the Account ID
    constructor(setName: string, isPublic: boolean, tags : string[], author : string) {
        this.setName = setName;
        this.isPublic = isPublic;
        this.author = author;
        this.tags = tags;
    }
}
