import {quizzardApiClient} from './api-client';

export const getAllSubForums = async () => {
    let resp = await quizzardApiClient.get('/forum');

    if(resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    console.log(resp.data);
    return resp.data;
}