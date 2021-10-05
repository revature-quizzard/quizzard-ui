
/**
 * @author Sean Taba
 * Interface for User entity
 */
export class User {
    id: string;
    username: string;
    name: string;
    email: string;
    token: string;
    profilePicture: string;

    constructor(id:string, username: string, name: string, email: string, token: string, profilePicture:string){
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.token = token;
        this.profilePicture = profilePicture;
    }
}