
import {Flashcard} from "./flashcard";
import {Account} from "./account";

/**
 * @author Sean Taba
 * interface for study-set entity
 */
export interface StudySet {
    id: number;
    creator: Account;
    cards: Flashcard[];
    name: string;
    isPublic: boolean;
}