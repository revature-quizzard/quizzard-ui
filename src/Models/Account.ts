import {Role} from "./Role";
import {User} from "./User";

export interface Account {
    id: number,
    points: number,
    username: string,
    password: string,
    roles: Role[],
    user: User
}