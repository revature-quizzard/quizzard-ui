/**
 * @Author: Sean Taba
 */
import {Account} from "./Account";
import {Subject} from "./Subject";

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
    subject_id: number,
    account_id: number,
    studySet_id: number,
    question: string,
    answer: string,
    reviewable: boolean,
    isPublic: boolean
}