import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Subforum } from '../models/subforum';
import AddThread from '../components/Forum/AddThread';
import {Thread } from '../models/thread';
import { addThread } from '../remote/thread-service';
import { forumState } from '../state-slices/forum/forum-slice';

jest.mock('../remote/thread-service');
jest.mock('../state-slices/forum/forum-slice');




interface TempState {
    currentSubforum: Subforum | undefined;
}

let initialState: any;

describe('Add Thread Component Test Suite', () => {

    beforeAll(() => {
        configure({adapter: new Adapter()});
    });

    beforeEach(() => {
        initialState = {
            currentSubforum: undefined
        }
    });

    afterEach(() => {
        jest.resetAllMocks();
        initialState = null;
    });

    it('Component renders successfully', () => {

        //configure mock store
        const configureMockStore = createMockStore();
        const mockStore = configureMockStore(initialState);

        //set up wrapper class;
        const wrapper = shallow(<Provider store={mockStore}>
                                    <AddThread />
                                </Provider>);
        
        //expect it do be truthy (i.e., somthing renders)
        expect(wrapper).toBeTruthy;
    });

    
    // it('Component calls addThread when given valid information', () => {
    //     // configure mock redux store
    //     initialState = {
    //         currentSubforum: new Subforum([], 'NULL', 'description', 'subforumId', 'subject', 1, '2021-09-28T12:34:56.789'),
    //     }
    //     const configureMockStore = createMockStore();
    //     const mockStore = configureMockStore(initialState);

    //     // set up the wrapper
    //     const wrapper = mount(<Provider store={mockStore}>
    //                             <AddThread />
    //                          </Provider>);

    //     let subjectWrapper = wrapper.find('#subjectInput').at(0);
    //     let descriptionWrapper = wrapper.find('#descriptionInput').at(0);
    //     let createButtonWrapper = wrapper.find('#createThreadButton').at(0);

    //     subjectWrapper.simulate('change', 'this is a test subject');
    //     descriptionWrapper.simulate('change', 'this is a test description');

    //     createButtonWrapper.simulate('click');
        
    //     // expect certain methods to be called
    //     expect(addThread).toBeCalled();
    // });



});