import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Round } from "../../models/round";
import { errorState } from "../../state-slices/error/errorSlice";
import { gameState, translateX, translateY } from "../../state-slices/game/game-slice";







const GameComponent = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const error = useSelector(errorState);
    const gamestate = useSelector(gameState);

    let rounds = {emoji: '&#x1F525', points: 300} as Round
    

    const HandleTranslateV = (e : any) => {
        console.log(e.keyCode);
        dispatch(translateY());
       
    }

    const HandleTranslateH = (e : any) => {
        dispatch(translateX());
    }

   window.addEventListener('keydown' , (e) => { 
       
    console.log(e.key);
    switch(e.key)
    {
        case 'ArrowRight' :
            dispatch(translateX());
           
            break;

        case 'ArrowUp' :
                dispatch(translateY());
                break;

    }
})
  
  /*
    Perfection looks like this (what all axios calls should look like):
  */
   
  
      return (
          <>
          <p style={{ height: gamestate.target_position.y , width: gamestate.target_position.x  ,  justifyContent: 'center'}}>{rounds.emoji}</p>
        </>
      )
  }
  
  export default GameComponent;