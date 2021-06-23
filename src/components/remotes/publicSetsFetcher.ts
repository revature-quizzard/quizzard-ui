import axios from "axios";
import {StudySet} from "../../Models/StudySet";

export const publicSetsFetcher = async () =>
{
    console.log('Running PublicSetsFetcher');
    let data: StudySet[] = [];
    const remoteURL = 'http://localhost:5000';
    await axios.get(`${remoteURL}/sets`)
        .then(response => {
           data = response.data;
        })
        .catch(e => console.log(e));
    return data;
}

