
import {Role} from "./role";
import {User} from "./user";

/**
 * @author Sean Taba
 * interface for Account entity
 */
export interface Account {
    id: number,
    points: number,
    username: string,
    password: string,
    roles: Role[],
    user: User
}