
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

    constructor(id:string, username: string, name: string, email: string, token: string){
        this.id = id;
        this.username = username;
        this.name = name;
        this.email = email;
        this.token = token;
    }
}