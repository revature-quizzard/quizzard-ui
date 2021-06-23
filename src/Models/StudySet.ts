/**
 * @Author: Sean Taba
 */
import {Flashcard} from "./Flashcard";
import {Account} from "./Account";

export interface StudySet {
    id: number;
    creator: Account;
    cards: Flashcard[];
    name: string;
    isPublic: boolean;
}