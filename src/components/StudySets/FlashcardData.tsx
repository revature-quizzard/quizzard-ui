/**
 * @Author: Sean Taba
 */

import {Flashcard} from "../../Models/Flashcard";

const FlashcardData = (props: any) => {
    const clickHandler = (e: any) => {

    }
    return (
            <tbody>
            {
                props.data.cards.map((card: Flashcard) =>
                <tr id={card.id.toString()} key={card.id} onClick={clickHandler}>
                    <th scope="row">{card.id}</th>
                    <td>{card.subject.name}</td>
                    <td>{card.creator.user.firstName}</td>
                    <td>{card.question}</td>
                    <td>{card.answer}</td>
                    <td>{card.reviewable.toString()}</td>
                    <td>{card.public.toString()}</td>
                </tr>
                )
            }
            </tbody>
    )
}

export default FlashcardData;