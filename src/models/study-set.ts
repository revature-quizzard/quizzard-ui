
import { SetFlashcardDTO} from "./flashcard";
import {Account} from "./account";

/**
 * @author Sean Taba
 * interface for study-set entity
 */
export interface StudySet {
    id: number;
    creator: Account;
    cards: SetFlashcardDTO[];
    name: string;
    isPublic: boolean;
}