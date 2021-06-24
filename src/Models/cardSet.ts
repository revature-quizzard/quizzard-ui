export class CardSet {

    setId: number;
    setName: String;
    isPublic: boolean;

    constructor(setId: number, setName: string, isPublic: boolean) {
        this.setId = setId;
        this.setName = setName;
        this.isPublic = isPublic;
    }
}