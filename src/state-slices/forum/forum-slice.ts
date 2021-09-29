import { Subforum } from '../../models/subforum';
import { Thread } from '../../models/thread';


interface State {
    currentSubforum: Subforum;
    currentThread: Thread;
}