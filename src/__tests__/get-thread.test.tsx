import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import GetThreads from '../components/Forum/GetThread';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import * as redux from 'react-redux';
import forumReducer, { forumState } from '../state-slices/forum/forum-slice';
import { getAllThreads } from '../remote/sub-forum-service';
jest.mock('../remote/sub-forum-service');
import { showSnackbar, setErrorSeverity } from '../state-slices/error/errorSlice';
import { configureStore } from '@reduxjs/toolkit';
jest.mock('../state-slices/error/errorSlice')

interface TempState {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
}

let initialState: any;

describe('Get Threads Component Test Suite', () => {

    beforeAll(() => {
        configure({ adapter: new Adapter() });
    })

    beforeEach(() => {
        initialState = {
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
                                    <GetThreads />
                                </Provider>);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    })

    it('GetThread calls the api on initial render', () => {
        // set up initial state
        initialState = { currentSubforum: new Subforum([], "NULL", "Description", "ID", "Subject", 1) };

        // configure mock store
        const mockStore = configureStore({
            reducer: {forumInfo: forumReducer},
            //@ts-ignore
            initialState
        });
        
        // provide mock implementation for getAllThreads
        (getAllThreads as jest.Mock).mockImplementation(() => {
            return Promise.resolve([new Thread(["Ancestor"], "Parent", "Description", "ID", "Subject")])
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
                                    <GetThreads />
                                </Provider>);

        // expect the api function to have been called
        expect(getAllThreads).toBeCalled();
    })

})