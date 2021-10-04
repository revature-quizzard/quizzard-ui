import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import SubforumHandler from '../components/Forum/Subforum';
import { Subforum } from '../models/subforum';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { assert } from 'console';
jest.mock('../remote/comment-service');
import { showSnackbar, setErrorSeverity } from '../state-slices/error/errorSlice';
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
    })})