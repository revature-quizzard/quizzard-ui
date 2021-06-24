/**
 * @Author: Sean Taba
 */

import {Flashcard} from "../../Models/Flashcard";
import {useAppSelector} from "../../store/hooks";
import {studySetState} from "../../StateSlices/StudySet/studysetSlice";

const FlashcardData = (props: any) => {
    console.log('FlashcardData rendering:');

    const state = useAppSelector(studySetState);
    const flashCards = state.availablePublicStudySets[state.selectedStudySet.id - 1].cards;
    const clickHandler = (e: any) => {

    }
    return (
            <tbody>
            {flashCards.map((card: Flashcard) =>
                    <tr id={card.id.toString()} key={card.id} onClick={clickHandler}>
                        <th scope="row">{card.id}</th>
                        <td>{card.subject.name}</td>
                        <td>{card.creator.user.firstName}</td>
                        <td>{card.question}</td>
                        <td>{card.answer}</td>
                        <td>{card.reviewable.toString()}</td>
                        <td>{card.public.toString()}</td>
                    </tr>
               ) }

            </tbody>
    )
}

export default FlashcardData;