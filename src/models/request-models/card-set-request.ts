import {Flashcard} from "../flashcard"

export class CardSetRequest {
    setName: String;
    isPublic: boolean;
    localFlashcards: Array<Flashcard>;
    // You need something for Accounts, I'd recommend using the Account ID

    constructor(setName: string, isPublic: boolean, localFlashcards: Array<Flashcard>) {
        this.setName = setName;
        this.isPublic = isPublic;
        this.localFlashcards = localFlashcards;
    }
}