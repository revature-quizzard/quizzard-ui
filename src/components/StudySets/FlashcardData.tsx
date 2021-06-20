/**
 * @Author: Sean Taba
 */
import {DetailedHTMLProps} from "react";
import {Flashcard} from "../../Models/Flashcard";
import {dummyFlashcardData} from "../dummyData";

const FlashcardData = () => {
    const clickHandler = (e: DetailedHTMLProps<any, any>) => {

    }

    return (
            <tbody>
            {
                dummyFlashcardData.map((card: Flashcard) =>
                <tr id={card.id.toString()} key={card.id} onClick={clickHandler}>
                    <th scope="row">{card.id}</th>
                    <td>{card.subject_id}</td>
                    <td>{card.account_id}</td>
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