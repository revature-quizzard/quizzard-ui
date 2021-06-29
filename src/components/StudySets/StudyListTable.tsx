import React from "react";
import {Table, Row, Col} from "react-bootstrap";
import {useAppSelector, useAppDispatch} from "../../store/hooks";
import {publicSetsFetcher, ownedSetsFetcher} from "../../remote/sets-fetcher";
import {
    saveStudySets,
    setStudySet,
    studySetState,
} from "../../state-slices/study-set/study-set-slice";
import {authState} from "../../state-slices/auth/auth-slice";
import {useEffect} from "react";

export default function StudyListTable(props: any) {

    const dispatch = useAppDispatch();
    const state = useAppSelector(studySetState);
    const auth = useAppSelector(authState);

    useEffect(() => {
        publicSetsFetcher(auth.token).then(data => {
            console.log(data);
            dispatch(saveStudySets(data));
        }).catch(err => console.log());


        ownedSetsFetcher(auth.token)
            .then((data) => {
                console.log(data);
                dispatch(saveStudySets(data));
            })
            .catch((err) => console.log(err));
    }, [state.selectedStudySet.cards]);

    if (!state.finishedLoading && props.content === "public-sets") {
        publicSetsFetcher(auth.token).then((data) => {
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
            <div className={props.type === "sets" ? "tile-card" : "tile-card flashcard-tile"} id={index} onClick={clickHandler}>
                {props.type === "sets" && <p className="element-name tile-field">
                  {elem.name}
                </p>}
                {props.type === "sets" && elem.isPublic && <div className="is-public tile-field">Public</div>}
                {props.type === "sets" && !elem.isPublic && <div className="is-private tile-field">Private</div>}
                <p className="element-creator tile-field">
                  {elem.creator === null ? "Public" : elem.creator.username}
                </p>

              {props.type === "flashcards" && (
                <>
                    <p className="tile-field tile-flashcard-field">{elem.question}</p>
                    <p className="tile-field tile-flashcard-field">{elem.subject.name}</p>
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