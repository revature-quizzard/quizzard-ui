import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  currentlyLoading,
  saveStudySets,
  setStudySet,
  studySetState,
} from "../../state-slices/study-set/study-set-slice";
import { StudySet } from "../../models/study-set";
import { ownedSetsFetcher } from "../../remote/sets-fetcher";
import { authState } from "../../state-slices/auth/auth-slice";

/**
 * @author Sean Taba
 * @param props: Callback function
 */
const OwnedStudySetData = (props: any) => {
  let state = useAppSelector(studySetState);
  let auth = useAppSelector(authState);
  const dispatch = useAppDispatch();

  if (!state.finishedLoading) {
    ownedSetsFetcher(auth.authUser.token).then((data) => {
      dispatch(saveStudySets(data));
    });
  }

  const clickHandler = (e: any) => {
    dispatch(setStudySet(state.availableStudySets[e.currentTarget.id - 1]));
    props.onStudySetChange();
  };

  return (
    <tbody>
      {state.finishedLoading &&
        state.availableStudySets.map((dataPoint: StudySet) => (
          <tr
            key={dataPoint.id}
            id={dataPoint.id.toString()}
            onClick={clickHandler}
          >
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

export default OwnedStudySetData;
