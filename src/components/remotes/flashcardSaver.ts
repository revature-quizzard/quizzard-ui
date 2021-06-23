import axios from "axios";


export const flashcardSaver = async (props: any) =>
{
    let returnCard = {};
    console.log('Running flashcardSaver');
    console.log(props);
    const remoteURL = 'http://localhost:5000';
    await axios.post(`${remoteURL}/cards/save`,
        props)
        .then(response => {
            returnCard = response.data;
            console.log(returnCard);
        })
        .catch(e => console.log(e));
    return returnCard;
}