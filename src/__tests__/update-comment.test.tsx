import { shallow, configure, mount } from 'enzyme';
import * as redux from 'react-redux';
import forumReducer, { forumState } from '../state-slices/forum/forum-slice';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UpdateComment from '../components/Forum/UpdateComment';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';
import { Comment } from '../models/comment';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { configureStore } from '@reduxjs/toolkit';

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

    it('Component calls updateComment when button is clicked', () => {
        // set up the initial state
        initialState = {
            currentComment: new Comment(['subforumId','threadId'], 'threadId', 'description', 'username', 'id','subject',0,'2021-10-06T23:29:17.650',[])
        }

        // configure the mock store
        //@ts-ignore
        const mockStore = configureStore({reducer: {forumInfo: forumReducer}, initialState})
    });

})