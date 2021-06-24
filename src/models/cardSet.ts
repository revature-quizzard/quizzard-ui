import {Flashcard} from "../Models/Flashcard"

export class CardSet {

    // setId: number;
    setName: String;
    isPublic: boolean;
    localFlashcards: Array<Flashcard>;
    // You need something for Accounts, I'd recommend using the Account ID

    constructor(setName: string, isPublic: boolean, localFlashcards: Array<Flashcard>) {
        //implement accountid association
        // this.setId = setId;
        this.setName = setName;
        this.isPublic = isPublic;
        this.localFlashcards = localFlashcards;
    }
}