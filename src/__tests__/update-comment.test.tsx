import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UpdateComment from '../components/Forum/UpdateComment';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';
import { Comment } from '../models/comment';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

jest.mock('../remote/comment-service');
jest.mock('../state-slices/error/errorSlice')

interface TempState {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
    currentComment: Comment | undefined;
}

let initialState: any;

describe('Update Comment Component Test Suite', () => {

    beforeAll(() => {
        configure({ adapter: new Adapter() });
    });

    beforeEach(() => {
        initialState = {
            currentSubforum: undefined,
            currentThread: undefined,
            currentComment: undefined
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        initialState = null;
    });

    it('Component renders successfully', () => {
        // configure mock store
        const configureMockStore = createMockStore();
        const mockStore = configureMockStore(initialState);

        // set up wrapper class
        const wrapper = shallow(<Provider store={mockStore}>
                                    <UpdateComment close={() => (false)} />
                                </Provider>);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    });

})