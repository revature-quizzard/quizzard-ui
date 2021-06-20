import {StudySet} from "../Models/StudySet";
import {Account} from "../Models/Account";

export const dummyStudySetData: StudySet[] =
    [
        {
            id: 1,
            account_id: 25,
            name: 'OOP Set',
            public: true
        },
        {
            id: 2,
            account_id: 16,
            name: 'Basic Java Set',
            public: true
        },
        {
            id: 3,
            account_id: 32,
            name: 'React Set',
            public: true
        }
    ];

export const dummyAccountData: Account[] =
    [
        {
            id: 45,
            user_id: 32,
            username: 'seantaba',
            password: 'password',
            points: 125
        },
        {
            id: 23,
            user_id: 16,
            username: 'jondoe',
            password: 'password',
            points: 46
        },
        {
            id: 13,
            user_id: 9,
            username: 'markcuban',
            password: 'password',
            points: 12
        }
    ];