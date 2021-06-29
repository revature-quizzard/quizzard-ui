import React from 'react';
import { Table } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { publicSetsFetcher, ownedSetsFetcher } from "../../remote/sets-fetcher";
import {
    currentlyLoading,
    saveStudySets,
    setStudySet,
    studySetState
} from "../../state-slices/study-set/study-set-slice";
import { authState } from '../../state-slices/auth/auth-slice';
import { useEffect } from 'react';

export default function StudyListTable(props: any) {
    console.log("props.columns: ", props.columns);
    const dispatch = useAppDispatch();
    const state = useAppSelector(studySetState);
    const auth = useAppSelector(authState);

    useEffect(() => {
        publicSetsFetcher().then(data => {
            console.log(data);
            dispatch(saveStudySets(data));
        }).catch(err => console.log());

        ownedSetsFetcher(auth.token).then(data => {
            console.log(data);
            dispatch(saveStudySets(data));
        }).catch(err => console.log(err));

    }, [state.selectedStudySet.cards])

    if (!state.finishedLoading && props.content === "public-sets") {
        publicSetsFetcher().then(data => {
            console.log(data);
            dispatch(saveStudySets(data));
        });
    }

    if (!state.finishedLoading && props.content === "owned-sets") {
        ownedSetsFetcher(auth.token).then(data => {
            console.log(data);
            dispatch(saveStudySets(data));
        });
    }

    const clickHandler = (e: any) => {
        if (props.type === "sets") {
            dispatch(setStudySet(state.availableStudySets[e.currentTarget.id - 1]));
            props.onStudySetChange();
        }

    }

    const iterable: Array<any> = props.type === "sets"
        ? state.availableStudySets
        : state.selectedStudySet.cards;


    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    {props.columns.map((elem: String, index: number) => {
                        return (<th key={`column-label: ${index}`}>{elem}</th>)
                    })}
                </tr>
            </thead>
            {state.finishedLoading && iterable.map((elem: any, index: number) => {
                return (<tr key={index} id={elem.id} onClick={clickHandler}>
                    <th scope="row">{elem.id}</th>

                    {props.type === "sets" &&
                        <>
                            <td>{elem.creator === null ? 'Public' : elem.creator.username}</td>
                            <td>{elem.name}</td>
                            <td>{elem.isPublic.toString()}</td>
                        </>}

                    {props.type === "flashcards" &&
                        <>
                            <td>{elem.subject.name}</td>
                            <td>{elem.creator.username}</td>
                            <td>{elem.question}</td>
                            <td>{elem.answer}</td>
                            <td>{elem.reviewable.toString()}</td>
                            <td>{elem.public.toString()}</td>
                        </>}
                </tr>)
            })}

        </Table>
    )
}
