import { Tag } from "./Tag"
import { Card } from "./Card"


export class Set {
    id : string;
    cards: Card[];
    views : number;
    plays : number;
    studies : number;
    favorites : number;
    setName: String;
    isPublic: boolean;
    author: string;
    tags: Tag[];
    // You need something for Accounts, I'd recommend using the Account ID


    constructor(id: string, cards: Card[], views: number, plays: number, studies: number, favorites: number, setName: String, isPublic: boolean, author: string, tags: Tag[]) {
        this.id = id;
        this.cards = cards;
        this.views = views;
        this.plays = plays;
        this.studies = studies;
        this.favorites = favorites;
        this.setName = setName;
        this.isPublic = isPublic;
        this.author = author;
        this.tags = tags;
    }
}
