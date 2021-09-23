 /**
   * interface for runtime enviornment
   * @author 'Alfonso Holmes'
   */
export interface RunTimePlayerModel {
    name: string, // players name for leaderboard
    answered: boolean, // have they answered yet
    answer: string, // players answer
    points:  number, // how many points does this player have
    numberOfCorrectAnswers:  number, // number of correctly guessed answers
    Streak: number // questions answered correctly in a row
}