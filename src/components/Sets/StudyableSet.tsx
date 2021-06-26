import { FlipCard } from "../Flashcards/FlipCard"
import {
    setFlashcards,
    isLoaded,
    flashcardsState,
  } from "../../state-slices/flashcard/flashcard-slice";
import { getCards } from "../../remote/card-service";
import { getStudySet } from "../../remote/set-service";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CardSet } from "../../models/card-set";

export const StudyableSet = () => {
    const [selectedSet, setSelectedSet] = useState<CardSet>(undefined);
    const [isStudying, setIsStudying] = useState(false);
    const [selectedSetId, setSelectedSetId] = useState(1);
    const flashcards = useSelector(flashcardsState);

    const dispatch = useDispatch();
    
    useEffect(() => {
        const getSet = async () => {
            setSelectedSet(await getStudySet(selectedSetId))
        }
        getSet();
        
    })

    const handleClick = () => {
        console.log("Selected Set: ", selectedSet.setName)
        setIsStudying(true);
        dispatch(setFlashcards(selectedSet.localFlashcards))
        //set flashcards
    }

    return (
        <>
            {
                isStudying ? 

                <>
                    <h1>test</h1>
                    <FlipCard/>
                </>
                : 
                <>
                    <h2>Display public study sets</h2>
                    <button onClick = {handleClick}>Study</button>
                </>
            }
        </>
    )
}