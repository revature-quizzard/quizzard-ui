/**
 * Model that we use for to match the expected DTO that backend expect to receive.
 */
export interface UpdateAccModel {
    username: string,
    email: string,
    password: string
}

export interface ResUpdateAccModel{
    username: string,
    email: string,
    password: string,
    conflict:string

}