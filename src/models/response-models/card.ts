

export class Card {
    card_id: string;
    question: string;
    answer: string;
    set_id: string;
    // You need something for Accounts, I'd recommend using the Account ID
    constructor(question: string, answer: string , set_id : string , card_id : string) {
        this.question = question;
        this.answer = answer;
        this.set_id = set_id;
        this.card_id = card_id;
    }
}