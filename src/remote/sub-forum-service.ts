import {quizzardApiClient} from './api-client';

/**
 * Makes an axios call to the API to get all subforums in the database
 * @returns The data inside the axios response, including a 200 status
 * @author Sean Smith
 */
export const getAllSubForums = async () => {
    let resp = await quizzardApiClient.get('/forum');

    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    console.log(resp.data);
    return resp.data;
}

/**
 * Makes an axios call to the API to get all threads inside of a specific subforum
 * @param id The ID of the subforum whose threads we want to obtain
 * @returns The data inside the axios response, including a 200 status
 * @author Sean Smith
 */
 export const getAllThreads = async (id: string) => {
    let resp = await quizzardApiClient.get('/forum/' + id);

    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    console.log(resp.data);
    return resp.data;
}