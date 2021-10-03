import React, { useRef, useState } from "react";
import { CountdownCircleTimer} from "react-countdown-circle-timer";
import "../../index.css";

/**
 * React component renders a timer with the time duration passed in props.
 * 
 * @author Colby Wall, Sean Dunn, Heather Guilfoyle
 */

interface RemainingTime {
    remainingTime: number
}
interface ITimerProps{
    start: number;
    onTimeout: (() => void);
}

function Timer(props: ITimerProps) {
    const [currentTime, setCurrentTime] = useState(0);
    const [prevTime, setPrevTime] = useState(null);
    const isNewTimeFirstTick = useRef(false);           //Come back to this later
    const [, setOneLastRerender] = useState(0);

    const renderTime = (time:RemainingTime) => {
      
        if (currentTime !== time.remainingTime) {
          isNewTimeFirstTick.current = true;
          setPrevTime(currentTime);
          setCurrentTime(time.remainingTime);
        } else {
          isNewTimeFirstTick.current = false;
        }
      
        // force one last re-render when the time is over to trigger the last animation
        if (time.remainingTime === 0) {
          setTimeout(() => {
            setOneLastRerender(val => val + 1);
          }, 20);
        }
      
        const isTimeUp = isNewTimeFirstTick.current;
      
        return (
          <div className="time-wrapper">
            <div key={time.remainingTime} className={`time ${isTimeUp ? "up" : ""}` }>
              {time.remainingTime}
            </div>
          </div>
        );
      };

      const arrayOColors:any = [["#21d900", 0.33], ["#F7B801", 0.33], ["#A30000"]];

  return (
    <div className="App">
      <h1>
        Timer Yay
      </h1>
      <div className="timer-wrapper">
        {/*@ts-ignore*/}
        <CountdownCircleTimer
          isPlaying
          duration={props.start}
          colors={arrayOColors}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default Timer;