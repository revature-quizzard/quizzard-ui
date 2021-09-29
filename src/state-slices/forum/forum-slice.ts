import { Subforum } from '../../models/subforum';
import { Thread } from '../../models/thread';


interface State {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
}

const initialState: State = {
    currentSubforum: undefined,
    currentThread: undefined
}