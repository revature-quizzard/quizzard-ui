import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { publicSetsFetcher, ownedSetsFetcher } from "../../remote/sets-fetcher";
import {
  saveStudySets,
  setStudySet,
  studySetState,
  currentlyLoading,
  finishedLoading
} from "../../state-slices/study-set/study-set-slice";
import { authState } from "../../state-slices/auth/auth-slice";
import { useEffect } from "react";

export default function StudyListTable(props: any) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(studySetState);
  const auth = useAppSelector(authState);

  useEffect(() => {
    
    if (props.content === "public-sets") {
      dispatch(currentlyLoading());
      publicSetsFetcher(auth.token)
        .then((data) => {
          console.log(data);
          dispatch(saveStudySets(data));
          dispatch(finishedLoading());
        })
        .catch((err) => console.log());
    }

    if (props.content === "owned-sets") {
      dispatch(currentlyLoading());
      ownedSetsFetcher(auth.token)
        .then((data) => {
          console.log(data);
          dispatch(saveStudySets(data));
          dispatch(finishedLoading());
        })
        .catch((err) => console.log(err));
    }
      
  }, [state.selectedStudySet.cards]);

  const clickHandler = (e: any) => {
    if (props.type === "sets") {
      console.log(
        "e.currentTarget.id with out negative one",
        state.availableStudySets[e.currentTarget.id]
      );
      dispatch(setStudySet(state.availableStudySets[e.currentTarget.id]));
      props.onStudySetChange();
    }
  };

  const iterable: Array<any> =
    props.type === "sets"
      ? state.availableStudySets
      : state.selectedStudySet.cards;

  return (
    <div className="tile-container">
      {state.finishedLoading &&
        iterable.map((elem: any, index: any) => {
          return (
            <div
              className={
                props.type === "sets" ? "tile-card" : "tile-card flashcard-tile"
              }
              id={index}
              onClick={clickHandler}
            >
              {props.type === "sets" && (
                <p className="element-name tile-field">{elem.name}</p>
              )}
              {props.type === "sets" && elem.isPublic && (
                <div className="is-public tile-field">Public</div>
              )}
              {props.type === "sets" && !elem.isPublic && (
                <div className="is-private tile-field">Private</div>
              )}
              <p className="element-creator tile-field">
                {elem.creator === null ? "Public" : elem.creator.username}
              </p>

              {props.type === "flashcards" && (
                <>
                  <p className="tile-field tile-flashcard-field">
                    {elem.question}
                  </p>
                  <p className="tile-field tile-flashcard-field">
                    {elem.subject.name}
                  </p>
                  <p className="tile-field">{elem.reviewable.toString()}</p>
                  <p className="tile-field">{elem.public.toString()}</p>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}
