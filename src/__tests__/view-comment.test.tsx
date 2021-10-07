import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import * as redux from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import forumReducer, { forumState } from '../state-slices/forum/forum-slice';
jest.mock('../remote/comment-service');
import { Comment } from '../models/comment';

import ViewComment from '../components/Forum/ViewComments';
import { viewComments } from '../remote/comment-service';
jest.mock('../state-slices/error/errorSlice')

interface TempState {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
}

let initialState: any;

describe('View Comments component test suite', () => {

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
        // configure mock store
        const configureMockStore = createMockStore();
        const mockStore = configureMockStore(initialState);

        // set up wrapper class
        const wrapper = shallow(<Provider store={mockStore}>
                                    <ViewComment />
                                </Provider>);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    })

    it('ViewComments calls the api on initial render', () => {
        // set up initial state
        initialState = { currentSubforum: new Subforum([], "NULL", "Description", "ID", "Subject", 1) };

        // configure mock store
        const mockStore = configureStore({
            reducer: {forumInfo: forumReducer},
            //@ts-ignore
            initialState
        });
        
        // provide mock implementation for viewComments
        (viewComments as jest.Mock).mockImplementation(() => {
            return Promise.resolve([new Comment(["Ancestor"], "Parent", "Description", "Owner")])
        });

        // set up spy for usesSelector (provide mock values)
        const spy = jest.spyOn(redux, 'useSelector');
        spy.mockImplementation((arg) => {
            if (arg === forumState) {
                return initialState;
            } else {
                return { authUser: {username: 'username'} }
            }
        })

        // set up wrapper class
        const wrapper = mount(<Provider store={mockStore}>
                                    <ViewComment />
                                </Provider>);

        // expect the api function to have been called
        expect(viewComments).toBeCalled();
    })
})