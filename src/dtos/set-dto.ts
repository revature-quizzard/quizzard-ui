import { Tag } from "./Tag"


export class SetDto {
    setName: String;
    isPublic: boolean;
    author: string;
    tags: String[];
    // You need something for Accounts, I'd recommend using the Account ID
    constructor(setName: string, isPublic: boolean, author : string , tags : String[]) {
        this.setName = setName;
        this.isPublic = isPublic;
        this.author = author;
        this.tags = tags;
    }
}
