
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
    currentlyLoading,
    savePublicStudySets,
    setStudySet,
    studySetState
} from "../../state-slices/study-set/study-set-slice";
import {StudySet} from "../../Models/study-set";
import {publicSetsFetcher} from "../../remote/public-sets-fetcher";

/**
 * @author Sean Taba
 * @param props: Callback function
 */
const StudySetData = (props: any) => {
    console.log('SSD');
    let state = useAppSelector(studySetState);
    const dispatch = useAppDispatch();

    if (!state.finishedLoading) {
        publicSetsFetcher().then(data => {
            console.log(data);
            dispatch(savePublicStudySets(data));
        });
    }
    const clickHandler = (e: any) => {
        dispatch(setStudySet(state.availablePublicStudySets[e.currentTarget.id - 1]));
        props.onStudySetChange();
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