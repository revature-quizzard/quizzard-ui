import { stringify } from "querystring"

export interface Game {
    id: string,
    name: string,
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: string,
    set: {
        id: string,
        name: string,
        creator: string,
        cardList: {
            id: string,
            question: string,
            correctAnswer: string,
            multiAnswers: string[]
        }
    },
    players: [{
        id: string,
        username: string,
        answered: boolean,
        answeredAt: string,
        answeredCorrectly: boolean,
        points: number
    }],
    createdAt: Date,
    updatedAt: Date
}