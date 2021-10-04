import { Tag } from "./Tag"


export class SetDto {
    setName: string;
    isPublic: boolean;
    author: string;
    tags: Tag[];
    // You need something for Accounts, I'd recommend using the Account ID
    constructor(setName: string, isPublic: boolean, author : string , tags : Tag[]) {
        this.setName = setName;
        this.isPublic = isPublic;
        this.author = author;
        this.tags = tags;
    }
}
