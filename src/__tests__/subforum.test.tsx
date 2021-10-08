import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SubforumHandler from '../components/Forum/Subforum';
import { Subforum } from '../models/subforum';
import { Provider } from 'react-redux';
import forumReducer, { setCurrentSubforum } from '../state-slices/forum/forum-slice';
import createMockStore from 'redux-mock-store';
import { configureStore } from '@reduxjs/toolkit';
import { assert } from 'console';
import { getAllSubForums } from '../remote/sub-forum-service';
jest.mock('../remote/sub-forum-service');
import { showSnackbar, setErrorSeverity } from '../state-slices/error/errorSlice';
import { act } from 'react-dom/test-utils';
jest.mock('../state-slices/error/errorSlice')

interface TempState {
    currentSubforum: Subforum | undefined;
}

let initialState: any;

describe('View Subforum Component Test Suite', () => {

    beforeAll(() => {
        configure({ adapter: new Adapter() });
    })

    beforeEach(() => {
        initialState = {
            currentSubforum: undefined
        }
        // new code below, see: https://redux.js.org/usage/writing-tests
        // store = configureStore({ reducer: {  } })
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
                                    <SubforumHandler />
                                </Provider>);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    })
    it('Subforum calls to the api on initial render', async () => {
        // configure mock store
        let mockStore = configureStore({
            //@ts-ignore
            reducer: { currentSubforum: setCurrentSubforum }, initialState
        });

        (getAllSubForums as jest.Mock).mockImplementation((): Promise<Subforum[]> => {
            return Promise.resolve([new Subforum([], "NULL", "Description", "ID", "Subject", 1)])
        });

        // set up wrapper class
        let wrapper;
        let subjectWrapper
        await act(() => {
        wrapper = mount(  <Provider store={mockStore}>
                                    <SubforumHandler />
                                </Provider>);
        wrapper.update();
        });
        
        // expect table to have a row with values
        expect(getAllSubForums).toBeCalled();
        });
    })