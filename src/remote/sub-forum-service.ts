import {quizzardApiClient} from './api-client';

/**
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