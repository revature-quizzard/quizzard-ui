import { Card } from "./response-models/card";
import { Tag } from "./tag";



export class Set {
    set_id : string;
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
    constructor(setName: string, isPublic: boolean, author : string , tags : Tag[] , set_id : string , favorites : number , cards: Card[]  , views : number  , plays : number ,studies : number) {
        this.setName = setName;
        this.isPublic = isPublic;
        this.author = author;
        this.tags = tags;
        this.set_id = set_id;
        this.favorites = favorites;
        this.studies = studies;
        this.cards = cards;
        this.plays = plays;
        this.views = views;
    }
}