import { SetDocument } from "./set-document";


/** 
 * This model is for mapping user information retrieved from /users and persisting it to the user's profile.
 * @author Cody McDonald
 * 
*/

export class UserData {
    id: string;
    username: string;
    favoriteSets: Array<SetDocument>;
    createdSets: Array<SetDocument>;
    profilePicture: string;
    points: number;
    wins: number;
    losses: number;
    registrationDate: string;
    gameRecords: Array<string>;

    constructor(id?: string, username?: string, favoriteSets?: Array<SetDocument>, createdSets?: Array<SetDocument>,
                profilePicture?: string, points?: number, wins?: number, losses?: number, registrationDate?: string,
                gameRecords?: Array<string>) {
        this.id = id;
        this.username = username;
        this.favoriteSets = favoriteSets;
        this.createdSets = createdSets;
        this.profilePicture = profilePicture+"?cachebust="+Math.random().toString(36).substr(2, 5);
        this.points = points;
        this.wins = wins;
        this.losses = losses;
        this.registrationDate = registrationDate;
        this.gameRecords = gameRecords;
    }

}