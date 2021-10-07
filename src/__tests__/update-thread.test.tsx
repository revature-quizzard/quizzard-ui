import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UpdateThread from '../components/Forum/UpdateThread';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import createMockStore from 'redux-mock-store';
import { store } from '../store/store';
import { updateThread } from '../remote/thread-service';
import { forumState } from '../state-slices/forum/forum-slice';

jest.mock('../remote/thread-service');

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

    it('Component calls updateThread for axios call when button is clicked', () => {
        // set initial state
        initialState = {
            ...initialState,
            currentThread: new Thread(['subforumId'],'subforumId','dsecription','subject','username','id',0,'021-10-06T23:29:17.650',[])
        }

        // mock props
        let mockClose = jest.fn();

        // set up a spy for useSelector (to mock values)
        const spy = jest.spyOn(redux, 'useSelector');
        spy.mockImplementation((arg) => {
            if (arg === forumState) {
                return initialState;
            } else {
                return { authUser: { username: 'username' } };
            }
        })

        // set up wrapper class
        const wrapper = mount(<Provider store={store}><UpdateThread close={mockClose} /></Provider>);

        let buttonWrapper = wrapper.find('#updateThreadButton').at(0);

        buttonWrapper.simulate('click');

        // expect updateThread to have been called
        expect(updateThread).toBeCalled();
    })

})