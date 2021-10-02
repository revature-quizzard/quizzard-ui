import { Tag } from "./tag";

/**
 * Simple interface for SetDocuments, simplified Sets held by user =.
 */

export interface SetDocument {
    id: string;
    setName: string;
    tags: Array<Tag>;
    isPublic: boolean;
    author: string;
    views: number;
    plays: number;
    studies: number;
    favorites: number;
}