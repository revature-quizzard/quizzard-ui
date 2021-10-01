
import {Flashcard, FlashcardDTO, SetFlashcardDTO} from "../../models/cards";
import {useAppSelector} from "../../store/hooks";
import {studySetState} from "../../state-slices/study-set/study-set-slice";

/**
 * @author Sean Taba
 * @returns {JSX.Element}
 * Populates flashcard table with flashcards belonging to the selected set
 */
const FlashcardData = () => {
    const state = useAppSelector(studySetState);
    //const flashCards = state.availablePublicStudySets[state.selectedStudySet.id].cards;
    const flashCards = state.selectedStudySet.cards;
    const clickHandler = (event: any) => {

    }
    return (
            <tbody>
            {flashCards.map((card: SetFlashcardDTO, index: any) =>
                    <tr id={index} key={card.id} onClick={clickHandler}>
                        <th scope="row">{card.id}</th>
                        <td>{card.subject.name}</td>
                        <td>{card.creator.username}</td>
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