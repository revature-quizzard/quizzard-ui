import { shallow, configure, mount } from 'enzyme';
import * as redux from 'react-redux';
import { forumState } from '../state-slices/forum/forum-slice';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UpdateComment from '../components/Forum/UpdateComment';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';
import { Comment } from '../models/comment';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { updateComment } from '../remote/comment-service';
import { store } from '../store/store';

jest.mock('../remote/comment-service');

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
        });

        // set up wrapper
        const wrapper = mount(<Provider store={store}><UpdateComment close={mockClose}/></Provider>)

        let buttonWrapper = wrapper.find('#updateCommentButton').at(0);

        buttonWrapper.simulate('click');

        // expect axios function to have been called
        expect(updateComment).toBeCalled();
    });

})