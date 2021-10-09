import { shallow, configure, mount } from 'enzyme';
import * as redux from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import AddComment from '../components/Forum/AddComment';
import { Subforum } from '../models/subforum';
import { Thread } from '../models/thread';import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { forumState } from '../state-slices/forum/forum-slice';
import { addComment } from '../remote/comment-service';
jest.mock('../remote/comment-service');
import { act } from '@testing-library/react';
import { store } from '../store/store';

let initialState: any;

describe('Add Comment Component Test Suite', () => {

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
                                    <AddComment
                                        dummySwitch={true}
                                        setDummySwitch={() => false} />
                                </Provider>);

        // expect it to be truthy (i.e. something renders)
        expect(wrapper).toBeTruthy();
    })

    it('Component calls addComment when create button is clicked', () => {
        // set up initial state
        initialState = {
            currentSubforum: new Subforum([], 'NULL', 'description', 'subforumId', 'subject', 1, '2021-09-28T12:34:56.789'),
            currentThread: new Thread(['subforumId'], 'subforumId', 'description', 'subject', 'username', 'threadId', 1, '2021-09-28T12:42:56.789')
        }

        // set up spy for useSelector (provide mock values)
        const spy = jest.spyOn(redux, 'useSelector');
        spy.mockImplementation((arg) => {
            if (arg === forumState) {
                return initialState;
            } else {
                return {
                    authUser: { username: 'username' }
                }
            }
        })
        // set up wrapper class
        const wrapper = mount(<Provider store={store}>
                                <AddComment
                                    dummySwitch={true}
                                    setDummySwitch={() => false} />
                                </Provider>);
        let createWrapper = wrapper.find('#createCommentButton').at(0);

        act(() => {createWrapper.simulate('click')});

        // expect addComment to have been called
        expect(addComment).toBeCalled();
    })
    
})