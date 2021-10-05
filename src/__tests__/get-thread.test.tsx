import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import GetThreads from '../components/Forum/GetThread';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { assert } from 'console';
import { getAllThreads } from '../remote/sub-forum-service';
jest.mock('../remote/sub-forum-service');
import { showSnackbar, setErrorSeverity } from '../state-slices/error/errorSlice';
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

    it('', () => {
        // configure mock store
        const configureMockStore = createMockStore();
        const mockStore = configureMockStore(initialState);
        
        (getAllThreads as jest.Mock).mockImplementation(() => {
            [
                new Thread(["Ancestor"], "Parent", "Description", "ID", "Subject")
            ]
        })

        // set up wrapper class
        const wrapper = shallow(<Provider store={mockStore}>
                                    <GetThreads />
                                </Provider>);

        // expect it to be truthy (i.e. something renders)
    }
    
    )

})