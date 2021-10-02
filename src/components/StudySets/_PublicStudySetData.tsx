import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  currentlyLoading,
  saveStudySets,
  setStudySet,
  studySetState,
} from "../../state-slices/study-set/study-set-slice";
import { StudySet } from "../../models/study-set";
import { publicSetsFetcher } from "../../remote/sets-fetcher";
import { authState } from "../../state-slices/auth/auth-slice";

/**
 * @author Sean Taba
 * @param props: Callback function
 */
const PublicStudySetData = (props: any) => {
  let state = useAppSelector(studySetState);
  let auState = useAppSelector(authState);
  const dispatch = useAppDispatch();

  if (!state.finishedLoading) {
    publicSetsFetcher(auState.authUser.token).then((data) => {
      dispatch(saveStudySets(data));
    });
  }

  const clickHandler = (e: any) => {
    dispatch(setStudySet(state.availableStudySets[e.currentTarget.id]));
    props.onStudySetChange();
  };

  return (
    <tbody>
      {state.finishedLoading &&
        state.availableStudySets.map((dataPoint: StudySet, index: any) => (
          <tr key={dataPoint.id} id={index} onClick={clickHandler}>
            <th scope="row">{dataPoint.id}</th>
            <td>
              {dataPoint.creator === null
                ? "Public"
                : dataPoint.creator.username}
            </td>
            <td>{dataPoint.name}</td>
            <td>{dataPoint.isPublic.toString()}</td>
          </tr>
        ))}
    </tbody>
  );
};

export default PublicStudySetData;
