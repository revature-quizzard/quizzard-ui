/**
 * @Author: Sean Taba
 */

import {StudySet} from "../Models/StudySet";
import {Account} from "../Models/Account";
import {Flashcard} from "../Models/Flashcard";

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

export const dummyFlashcardData: Flashcard[] =
    [
        {
            id: 145,
            subject_id: 21,
            account_id: 26,
            question: 'What is Java?',
            answer: 'It is a programming language',
            reviewable: false,
            public: true
        },
        {
            id: 96,
            subject_id: 14,
            account_id: 12,
            question: 'What is React?',
            answer: 'It is a Javascript library',
            reviewable: false,
            public: true
        },
        {
            id: 48,
            subject_id: 5,
            account_id: 36,
            question: 'How do you write a react component?',
            answer: 'I declare a constant function, returning a TSX',
            reviewable: false,
            public: true
        },
        {
            id: 21,
            subject_id: 8,
            account_id: 13,
            question: 'What is Redux?',
            answer: 'It is a react addon, providing central state management',
            reviewable: false,
            public: true
        }
    ];
