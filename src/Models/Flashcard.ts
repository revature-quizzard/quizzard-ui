/**
 * @Author: Sean Taba
 */

 export interface Flashcard {
    id: number;
    subject_id: number;
    account_id: number;
    question: string;
    answer: string;
    reviewable: boolean;
    public: boolean;
}