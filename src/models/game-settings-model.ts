import { SetFlashcardDTO } from "./cards";

  /**
   * interface for runtime enviornment
   * @author 'Alfonso Holmes'
   */
export interface GameSettingsModel {
    playerLimit: number, // number of players allowed in match
    set: SetFlashcardDTO[], // game set
    roundTimer:  number, // time to answer question
    lobbyName: string // name of lobby
}