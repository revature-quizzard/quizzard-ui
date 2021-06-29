import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { publicSetsFetcher, ownedSetsFetcher } from "../../remote/sets-fetcher";
import {
  currentlyLoading,
  saveStudySets,
  setStudySet,
  studySetState,
} from "../../state-slices/study-set/study-set-slice";
import { authState } from "../../state-slices/auth/auth-slice";
import { useEffect } from "react";

export default function StudyListTable(props: any) {
  console.log("props.columns: ", props.columns);
  const dispatch = useAppDispatch();
  const state = useAppSelector(studySetState);
  const auth = useAppSelector(authState);

  useEffect(() => {
    publicSetsFetcher()
      .then((data) => {
        console.log(data);
        dispatch(saveStudySets(data));
      })
      .catch((err) => console.log());

    ownedSetsFetcher(auth.token)
      .then((data) => {
        console.log(data);
        dispatch(saveStudySets(data));
      })
      .catch((err) => console.log(err));
  }, [state.selectedStudySet.cards]);

  if (!state.finishedLoading && props.content === "public-sets") {
    publicSetsFetcher().then((data) => {
      console.log(data);
      dispatch(saveStudySets(data));
    });
  }

  if (!state.finishedLoading && props.content === "owned-sets") {
    ownedSetsFetcher(auth.token).then((data) => {
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
    <div
      className="col-md-4 tileContainer"
    >
      {state.finishedLoading &&
        iterable.map((elem: any, index: number) => {
          return (
            <div
              className="studySetTile"
                  id={elem.id}
              onClick={clickHandler}
            >
              <Row>
                <Col className="elementName">{elem.name}</Col>
              </Row>
              <Row>
                {props.type === "sets" && (
                  <Col className="elementIsPublic">
                    {elem.isPublic ? (
                      <div className="isPublic">Public</div>
                    ) : (
                      <div className="isPrivate">Private</div>
                    )}
                  </Col>
                )}
              </Row>
              <Row>
                <Col className="elementCreator">
                  {elem.creator === null ? "Public" : elem.creator.username}
                </Col>
              </Row>

              {props.type === "flashcards" && (
                <>
                  <Row>
                    <Col>{elem.question}</Col>
                  </Row>
                  <Row>
                    <Col>{elem.answer}</Col>
                  </Row>
                  <Row>
                    <Col>{elem.subject.name}</Col>
                  </Row>
                  <Row>
                    <Col>{elem.reviewable.toString()}</Col>
                  </Row>
                  <Row>
                    <Col>{elem.public.toString()}</Col>
                  </Row>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}
