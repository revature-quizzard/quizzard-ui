import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AddComment from '../components/Forum/AddComment';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';
import { addComment } from '../remote/comment-service';
jest.mock('../remote/comment-service');

interface TempState {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
}

let initialState: TempState

describe('Add Comment Component Test Suite', () => {

    beforeAll(() => {
        configure({ adapter: new Adapter() });
    })

    beforeEach(() => {
        initialState = {
            currentSubforum: undefined,
            currentThread: undefined
        }
    })

    afterEach(() => {
        jest.resetAllMocks();
        initialState = null;
    })

    it('Component renders successfully', () => {
        // set up wrapper class
        const wrapper = shallow(<AddComment />);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    })

    it('Component calls addComment (POST request to quizzard api) when given valid information', () => {
        // configure mock redux store
        // adding something here
    })

    
})