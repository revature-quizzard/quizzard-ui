import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UpdateThread from '../components/Forum/UpdateThread';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';

jest.mock('../remote/thread-service');
jest.mock('../state-slices/error/errorSlice')

interface TempState {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
}

let initialState: any;

describe('Update Thread Component Test Suite', () => {

    beforeAll(() => {
        configure({ adapter: new Adapter() });
    });

    beforeEach(() => {
        initialState = {
            currentSubforum: undefined,
            currentThread: undefined,
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        initialState = null;
    });

    it('Component renders successfully', () => {
        // mock props
        let mockClose = jest.fn();

        // configure mock store
        const configureMockStore = createMockStore();
        const mockStore = configureMockStore(initialState);

        // set up wrapper class
        const wrapper = shallow(<Provider store={mockStore}>
                                    <UpdateThread close={mockClose}/>
                                </Provider>);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    });

})