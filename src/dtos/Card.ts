export class Card {
    id:string;
    question: string;
    answer: string;
    set_id: string;
    // You need something for Accounts, I'd recommend using the Account ID
    constructor(id: string, question: string, answer: string , set_id : string) {
        this.id=id;
        this.question = question;
        this.answer = answer;
        this.set_id = set_id;
    }
}
