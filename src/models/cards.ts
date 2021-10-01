
import {Account} from "./account";
import {Subject} from "./subject";

/**
 * @author Sean Taba
 * interface for Flashcard entity
 */
export interface CreateCard {
    question: string,
    answer: string,
    set_id: string
}


export interface SetFlashcardDTO {
    subject: Subject,
    creator: Account,
    question: string,
    answer: string,
    reviewable: boolean,
    public: boolean,
    studySetId: number
}