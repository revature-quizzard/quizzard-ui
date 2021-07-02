
import {Account} from "./account";
import {Subject} from "./subject";

/**
 * @author Sean Taba
 * interface for Flashcard entity
 */
export interface Flashcard {
    id: number,
    subject: Subject,
    creator: Account,
    question: string,
    answer: string,
    reviewable: boolean,
    public: boolean
}

export interface FlashcardDTO {
    id: number,
    subjectId: number,
    accountId: number,
    question: string,
    answer: string,
    reviewable: boolean,
    isPublic: boolean
}

export interface SetFlashcardDTO {
    id: number,
    subject: Subject,
    creator: Account,
    question: string,
    answer: string,
    reviewable: boolean,
    public: boolean,
    studySetId: number
}