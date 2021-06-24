/**
 * @Author: Sean Taba
 */

import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
    currentlyLoading,
    finishedLoading,
    savePublicStudySets,
    setStudySet,
    studySetState
} from "../../StateSlices/StudySet/studysetSlice";
import {StudySet} from "../../Models/StudySet";
import {publicSetsFetcher} from "../remotes/publicSetsFetcher";


const StudySetData = (props: any) => {
    console.log('StudySetData rendering');
    let state = useAppSelector(studySetState);
    const dispatch = useAppDispatch();

    if (!state.finishedLoading) {
        console.log('in here')
        dispatch(currentlyLoading());
        publicSetsFetcher().then(data => {
            console.log(data);
            dispatch(savePublicStudySets(data));
            console.log('after dispatch');
        });
    }
    const clickHandler = (e: any) => {
        dispatch(setStudySet(state.availablePublicStudySets[e.currentTarget.id - 1]));
        props.onStudySetChange(state.availablePublicStudySets[e.currentTarget.id - 1]);
    }
    return (
        <tbody>
        {state.finishedLoading && state.availablePublicStudySets.map((dataPoint: StudySet) =>
            <tr key={dataPoint.id} id={dataPoint.id.toString()} onClick={clickHandler}>
                <th scope="row" >{dataPoint.id}</th>
                <td>{dataPoint.creator === null ? 'Public' : dataPoint.creator.user.firstName}</td>
                <td>{dataPoint.name}</td>
                <td>{dataPoint.isPublic.toString()}</td>
            </tr>
        )}
        </tbody>
    )


};

export default StudySetData;